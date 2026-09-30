const BYL_API_BASE_URL = "https://byl.mn/api/v1";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  const token = process.env.BYL_TOKEN?.trim();
  const projectId = process.env.BYL_PROJECT_ID || "852";
  const priceLookupKey = process.env.BYL_PRICE_LOOKUP_KEY || "modelY_price";
  const productId = process.env.BYL_PRODUCT_ID || "1651";
  const requestOrigin = new URL(request.url).origin;

  if (!isSameOriginRequest(request, requestOrigin)) {
    return jsonResponse({ message: "Зөвшөөрөгдөөгүй хүсэлт байна." }, 403);
  }

  if (!token) {
    return jsonResponse({ message: "BYL API токен тохируулаагүй байна." }, 503);
  }

  const publicBaseUrl = getPublicBaseUrl(requestOrigin);
  const reference = `model-y-${productId}-${Date.now()}`.slice(0, 48);
  const checkoutPayload = {
    success_url: new URL("?checkout=success", publicBaseUrl).href,
    cancel_url: new URL("?checkout=cancelled", publicBaseUrl).href,
    client_reference_id: reference,
    phone_number_collection: true,
    email_collection: true,
    items: [
      {
        price: priceLookupKey,
        quantity: 1
      }
    ]
  };

  let bylResponse;
  try {
    bylResponse = await fetch(
      `${BYL_API_BASE_URL}/projects/${encodeURIComponent(projectId)}/checkouts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(checkoutPayload),
        cache: "no-store",
        signal: AbortSignal.timeout(15_000)
      }
    );
  } catch (error) {
    console.error(
      "BYL checkout request failed:",
      error instanceof Error ? error.message : error
    );
    return jsonResponse(
      {
        message:
          "BYL үйлчилгээтэй холбогдож чадсангүй. Түр хүлээгээд дахин оролдоно уу."
      },
      503
    );
  }

  const responseBody = await bylResponse.json().catch(() => ({}));

  if (!bylResponse.ok) {
    const errorName = responseBody.error || responseBody.message || "unknown_error";
    console.error(`BYL checkout failed (${bylResponse.status}): ${errorName}`);
    return jsonResponse(
      { message: getBylErrorMessage(bylResponse.status, responseBody) },
      bylResponse.status === 503 || bylResponse.status >= 500 ? 503 : 502
    );
  }

  const checkoutUrl = validateBylCheckoutUrl(responseBody?.data?.url);
  if (!checkoutUrl) {
    console.error("BYL checkout response did not include a valid checkout URL.");
    return jsonResponse({ message: "BYL-ээс буруу checkout хариу ирлээ." }, 502);
  }

  return jsonResponse(
    {
      id: responseBody.data.id,
      url: checkoutUrl
    },
    201
  );
}

function getPublicBaseUrl(requestOrigin) {
  const configuredUrl = process.env.APP_URL?.trim();

  if (configuredUrl) {
    try {
      const url = new URL(configuredUrl.endsWith("/") ? configuredUrl : `${configuredUrl}/`);
      if (url.origin === requestOrigin) return url;
    } catch {
      // Fall back to the active deployment URL below.
    }
  }

  return new URL(`${requestOrigin}/`);
}

function isSameOriginRequest(request, requestOrigin) {
  const origin = request.headers.get("origin");
  return !origin || origin === requestOrigin;
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

function getBylErrorMessage(status, body) {
  if (status === 401 || status === 403) {
    return "BYL API эрхийн тохиргоо буруу байна. Токен болон төслийн эрхийг шалгана уу.";
  }

  if (status === 422) {
    return (
      body?.errors?.["items.0.price"]?.[0] ||
      "BYL бүтээгдэхүүний үнэ эсвэл checkout тохиргоо буруу байна."
    );
  }

  if (status === 503) {
    return "BYL төслийн төлбөрийн тохиргоо дутуу эсвэл үйлчилгээ түр боломжгүй байна.";
  }

  return "BYL checkout үүсгэх үед алдаа гарлаа. Дахин оролдоно уу.";
}

function jsonResponse(payload, status) {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
