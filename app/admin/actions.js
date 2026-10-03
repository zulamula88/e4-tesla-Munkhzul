"use server";

import { redirect } from "next/navigation";
import { isAdminClaims, isAdminEmail } from "../../lib/auth/admin";
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
