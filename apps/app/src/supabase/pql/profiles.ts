import { PostgrestResponse } from "@supabase/supabase-js";
import { Profile } from "../../generated/graphql";
import supabase from "../index";

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
  };

  return profile;
}
