const BYL_API_BASE_URL = "https://byl.mn/api/v1";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return jsonResponse(
        { message: "Энэ endpoint зөвхөн POST хүсэлт хүлээн авна." },
        405,
        { Allow: "POST" }
      );
    }

    const token = process.env.BYL_TOKEN?.trim();
    const projectId = process.env.BYL_PROJECT_ID || "852";
    const priceLookupKey = process.env.BYL_PRICE_LOOKUP_KEY || "modelY_price";
    const productId = process.env.BYL_PRODUCT_ID || "1651";
    const appUrl = getAppUrl();

    if (!isSameOriginRequest(request, appUrl)) {
      return jsonResponse({ message: "Зөвшөөрөгдөөгүй хүсэлт байна." }, 403);
    }

    if (!token) {
      return jsonResponse(
        { message: "BYL API токен тохируулаагүй байна." },
        503
      );
    }

    if (!appUrl) {
      return jsonResponse(
        { message: "APP_URL тохируулах шаардлагатай." },
        503
      );
    }

    const reference = `model-y-${productId}-${Date.now()}`.slice(0, 48);
    const checkoutPayload = {
      success_url: new URL("?checkout=success", appUrl).href,
      cancel_url: new URL("?checkout=cancelled", appUrl).href,
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
          message: "BYL үйлчилгээтэй холбогдож чадсангүй. Түр хүлээгээд дахин оролдоно уу."
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
};

function getAppUrl() {
  const configuredUrl = process.env.APP_URL?.trim();
  if (!configuredUrl) return null;

  try {
    return new URL(configuredUrl.endsWith("/") ? configuredUrl : `${configuredUrl}/`);
  } catch {
    return null;
  }
}

function isSameOriginRequest(request, appUrl) {
  if (!appUrl) return false;

  const origin = request.headers.get("origin");
  return !origin || origin === appUrl.origin;
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

function jsonResponse(payload, status, extraHeaders = {}) {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    }
  });
}
