import { Profile } from "../../generated/graphql";
import supabase from "../index";
import { User } from "@supabase/supabase-js";

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

export function createSearchProfilesResult(data: any[], count: number) {
  return {
    profiles: data.map((aData) => createProfile(aData)),
    count,
  };
}
