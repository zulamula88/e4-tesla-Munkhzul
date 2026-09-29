import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(ROOT_DIR, "assets");

await loadEnvironment(join(ROOT_DIR, ".env"));

const PORT = parsePort(process.env.PORT);
const HOST = process.env.HOST || "127.0.0.1";
const BYL_API_BASE_URL = "https://byl.mn/api/v1";
const BYL_PROJECT_ID = process.env.BYL_PROJECT_ID || "852";
const BYL_PRICE_LOOKUP_KEY = process.env.BYL_PRICE_LOOKUP_KEY || "modelY_price";
const BYL_PRODUCT_ID = process.env.BYL_PRODUCT_ID || "1651";
const BYL_TOKEN = process.env.BYL_TOKEN?.trim();
const APP_URL = process.env.APP_URL?.trim();

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webp": "image/webp"
};

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");

    if (requestUrl.pathname === "/api/checkout") {
      await handleCheckout(request, response);
      return;
    }

    await serveStaticFile(request, response, requestUrl.pathname);
  } catch (error) {
    console.error("Unexpected server error:", error);
    sendJson(response, 500, { message: "Серверийн алдаа гарлаа. Дахин оролдоно уу." });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Tesla preorder server: http://${HOST}:${PORT}`);
  if (!BYL_TOKEN) {
    console.warn("BYL_TOKEN тохируулаагүй байна. Order Now одоогоор checkout үүсгэхгүй.");
  }
});

async function handleCheckout(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { message: "Энэ endpoint зөвхөн POST хүсэлт хүлээн авна." });
    return;
  }

  if (!isSameOriginRequest(request)) {
    sendJson(response, 403, { message: "Зөвшөөрөгдөөгүй хүсэлт байна." });
    return;
  }

  if (!BYL_TOKEN) {
    sendJson(response, 503, {
      message: "BYL API токен тохируулаагүй байна. Серверийн .env тохиргоог шалгана уу."
    });
    return;
  }

  const publicBaseUrl = getPublicBaseUrl(request);
  if (!publicBaseUrl) {
    sendJson(response, 503, {
      message: "Production орчинд APP_URL тохируулах шаардлагатай."
    });
    return;
  }

  const reference = `model-y-${BYL_PRODUCT_ID}-${Date.now()}`.slice(0, 48);
  const checkoutPayload = {
    success_url: new URL("?checkout=success", publicBaseUrl).href,
    cancel_url: new URL("?checkout=cancelled", publicBaseUrl).href,
    client_reference_id: reference,
    phone_number_collection: true,
    email_collection: true,
    items: [
      {
        price: BYL_PRICE_LOOKUP_KEY,
        quantity: 1
      }
    ]
  };

  let bylResponse;
  try {
    bylResponse = await fetch(
      `${BYL_API_BASE_URL}/projects/${encodeURIComponent(BYL_PROJECT_ID)}/checkouts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BYL_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(checkoutPayload),
        signal: AbortSignal.timeout(15_000)
      }
    );
  } catch (error) {
    console.error("BYL checkout request failed:", error instanceof Error ? error.message : error);
    sendJson(response, 503, {
      message: "BYL үйлчилгээтэй холбогдож чадсангүй. Түр хүлээгээд дахин оролдоно уу."
    });
    return;
  }

  const responseBody = await bylResponse.json().catch(() => ({}));

  if (!bylResponse.ok) {
    const errorName = responseBody.error || responseBody.message || "unknown_error";
    console.error(`BYL checkout failed (${bylResponse.status}): ${errorName}`);
    sendJson(response, mapBylStatus(bylResponse.status), {
      message: getBylErrorMessage(bylResponse.status, responseBody)
    });
    return;
  }

  const checkoutUrl = validateBylCheckoutUrl(responseBody?.data?.url);
  if (!checkoutUrl) {
    console.error("BYL checkout response did not include a valid checkout URL.");
    sendJson(response, 502, { message: "BYL-ээс буруу checkout хариу ирлээ." });
    return;
  }

  sendJson(response, 201, {
    id: responseBody.data.id,
    url: checkoutUrl
  });
}

async function serveStaticFile(request, response, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    response.writeHead(405).end();
    return;
  }

  const filePath = resolveStaticFile(pathname);
  if (!filePath) {
    response.writeHead(404).end("Not found");
    return;
  }

  try {
    const file = await readFile(filePath);
    const extension = extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Content-Length": file.length,
      "Cache-Control": pathname.startsWith("/assets/")
        ? "public, max-age=86400"
        : "no-cache",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    response.end(request.method === "HEAD" ? undefined : file);
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "EISDIR") {
      response.writeHead(404).end("Not found");
      return;
    }
    throw error;
  }
}

function resolveStaticFile(pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decodedPath === "/" || decodedPath === "/index.html") {
    return join(ROOT_DIR, "index.html");
  }

  if (decodedPath === "/styles.css" || decodedPath === "/app.js") {
    return join(ROOT_DIR, decodedPath.slice(1));
  }

  if (!decodedPath.startsWith("/assets/") || decodedPath.includes("\0")) {
    return null;
  }

  const assetPath = resolve(ASSETS_DIR, `.${decodedPath.slice("/assets".length)}`);
  if (assetPath !== ASSETS_DIR && !assetPath.startsWith(`${ASSETS_DIR}${sep}`)) {
    return null;
  }

  return assetPath;
}

function isSameOriginRequest(request) {
  const origin = request.headers.origin;
  if (!origin) return process.env.NODE_ENV !== "production";

  let allowedOrigin;
  try {
    allowedOrigin = APP_URL
      ? new URL(APP_URL).origin
      : new URL(`http://${request.headers.host}`).origin;
  } catch {
    return false;
  }

  return origin === allowedOrigin;
}

function getPublicBaseUrl(request) {
  if (APP_URL) {
    try {
      return new URL(APP_URL.endsWith("/") ? APP_URL : `${APP_URL}/`);
    } catch {
      return null;
    }
  }

  if (process.env.NODE_ENV === "production" || !request.headers.host) {
    return null;
  }

  return new URL(`http://${request.headers.host}/`);
}

function validateBylCheckoutUrl(value) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "byl.mn" ? url.href : null;
  } catch {
    return null;
  }
}

function mapBylStatus(status) {
  if (status === 503 || status >= 500) return 503;
  return 502;
}

function getBylErrorMessage(status, body) {
  if (status === 401 || status === 403) {
    return "BYL API эрхийн тохиргоо буруу байна. Серверийн токен болон төслийн эрхийг шалгана уу.";
  }

  if (status === 422) {
    const priceError = body?.errors?.["items.0.price"]?.[0];
    return priceError || "BYL бүтээгдэхүүний үнэ эсвэл checkout тохиргоо буруу байна.";
  }

  if (status === 503) {
    return "BYL төслийн төлбөрийн тохиргоо дутуу эсвэл үйлчилгээ түр боломжгүй байна.";
  }

  return "BYL checkout үүсгэх үед алдаа гарлаа. Дахин оролдоно уу.";
}

function sendJson(response, status, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(body);
}

function parsePort(value) {
  const parsed = Number(value || 4173);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 65_535 ? parsed : 4173;
}

async function loadEnvironment(filePath) {
  let source;
  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separator = line.indexOf("=");
    if (separator < 1) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (!/^[A-Z_][A-Z0-9_]*$/i.test(key) || process.env[key] !== undefined) continue;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}
