import { PostgrestResponse } from "@supabase/supabase-js";
import { Profile } from "../../generated/graphql";
import supabase from "../index";

export function checkUserProfileExists() {
  return supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .match({ id: supabase.auth.session().user.id })
    .then((result) => result.count > 0);
}

export function checkUidExists(uid: string) {
  return supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .match({ uid: uid })
    .then((result) => result.count > 0);
}

export function createProfile(data: any) {
  let filename = data.avatar_url;
  const profile: Profile = {
    id: data.id,
    uid: data.uid,
    name: data.name,
    avatar: filename && {
      url: supabase.storage.from("avatars").getPublicUrl(filename).publicURL,
      filename,
    },
    teams: [],
  };

  return profile;
}
