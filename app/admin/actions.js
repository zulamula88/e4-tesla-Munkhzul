"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminClaims, isAdminEmail } from "../../lib/auth/admin";
import { requireAdmin } from "../../lib/auth/require-admin";
import {
  FOOTER_SETTINGS_ID,
  isValidFooterText,
  normalizeFooterText
} from "../../lib/footer-settings";
import { createClient } from "../../lib/supabase/server";

const LOGIN_ERROR_URL = "/admin/login?error=invalid_credentials";

export async function login(formData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!isAdminEmail(email) || !password) {
    redirect(LOGIN_ERROR_URL);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(LOGIN_ERROR_URL);
  }

  const { data, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !isAdminClaims(data?.claims)) {
    await supabase.auth.signOut({ scope: "local" });
    redirect(LOGIN_ERROR_URL);
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/admin/login?status=signed_out");
}

export async function updateFooterText(formData) {
  await requireAdmin();

  const footerText = normalizeFooterText(formData.get("footerText"));

  if (!isValidFooterText(footerText)) {
    redirect("/admin?error=invalid_footer_text");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("footer_settings")
    .update({ footer_text: footerText })
    .eq("id", FOOTER_SETTINGS_ID)
    .select("footer_text")
    .single();

  if (error || data?.footer_text !== footerText) {
    redirect("/admin?error=footer_update_failed");
  }

  revalidatePath("/");
  redirect("/admin?status=footer_saved");
}
