import "server-only";

const DEFAULT_ADMIN_EMAIL = "zulamula.88@gmail.com";

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function getAdminEmail() {
  return normalizeEmail(process.env.ADMIN_EMAIL) || DEFAULT_ADMIN_EMAIL;
}

export function isAdminEmail(value) {
  return normalizeEmail(value) === getAdminEmail();
}

export function isAdminClaims(claims) {
  const adminUserId = process.env.ADMIN_USER_ID?.trim();

  return Boolean(
    adminUserId &&
      claims?.sub === adminUserId &&
      isAdminEmail(claims?.email)
  );
}
