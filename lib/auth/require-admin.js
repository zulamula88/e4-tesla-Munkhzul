import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { isAdminClaims } from "./admin";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !isAdminClaims(data?.claims)) {
    redirect("/admin/login");
  }

  return data.claims;
}
