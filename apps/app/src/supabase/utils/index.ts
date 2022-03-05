import supabase from "../index";
import { User } from "@supabase/supabase-js";

export function checkTidExists(tid: string) {
  return supabase
    .from("teams")
    .select("id", { count: "exact", head: true })
    .match({ tid: tid })
    .then((result) => result.count ?? 0 > 0) as Promise<boolean>;
}

export function checkUserProfileExists(user: User) {
  return supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .match({ id: user.id })
    .then((result) => result.count ?? 0 > 0);
}

export function checkUidExists(uid: string) {
  return supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .match({ uid: uid })
    .then((result) => result.count ?? 0 > 0) as Promise<boolean>;
}
