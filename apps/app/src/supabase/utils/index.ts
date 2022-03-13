import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

export function checkTidExists(tid: string) {
  return supabaseClient
    .from("teams")
    .select("id", { count: "exact", head: true })
    .match({ tid: tid })
    .then((result) => result.count ?? 0 > 0) as Promise<boolean>;
}

export function checkUidExists(uid: string) {
  return supabaseClient
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .match({ uid: uid })
    .then((result) => result.count ?? 0 > 0) as Promise<boolean>;
}
