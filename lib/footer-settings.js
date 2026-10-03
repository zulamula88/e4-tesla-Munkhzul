import "server-only";

export const DEFAULT_FOOTER_TEXT = "Tesla © 2026";
export const FOOTER_TEXT_MAX_LENGTH = 120;
export const FOOTER_SETTINGS_ID = 1;

const FOOTER_CACHE_TAG = "footer-settings";

export function normalizeFooterText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function isValidFooterText(value) {
  return value.length > 0 && value.length <= FOOTER_TEXT_MAX_LENGTH;
}

function valueOrDefault(value) {
  const normalized = normalizeFooterText(value);
  return isValidFooterText(normalized) ? normalized : DEFAULT_FOOTER_TEXT;
}

export async function getPublicFooterText() {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!projectUrl || !publishableKey) {
    return DEFAULT_FOOTER_TEXT;
  }

  try {
    const endpoint = new URL("/rest/v1/footer_settings", projectUrl);
    endpoint.searchParams.set("select", "footer_text");
    endpoint.searchParams.set("id", `eq.${FOOTER_SETTINGS_ID}`);
    endpoint.searchParams.set("limit", "1");

    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`
      },
      next: {
        revalidate: 3600,
        tags: [FOOTER_CACHE_TAG]
      },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return DEFAULT_FOOTER_TEXT;
    }

    const rows = await response.json();
    return valueOrDefault(rows?.[0]?.footer_text);
  } catch {
    return DEFAULT_FOOTER_TEXT;
  }
}

export async function getAdminFooterText(supabase) {
  const { data, error } = await supabase
    .from("footer_settings")
    .select("footer_text")
    .eq("id", FOOTER_SETTINGS_ID)
    .single();

  if (error) {
    return DEFAULT_FOOTER_TEXT;
  }

  return valueOrDefault(data?.footer_text);
}
