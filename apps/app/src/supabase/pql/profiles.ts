import { PostgrestResponse } from "@supabase/supabase-js";
import { Profile } from "../../generated/graphql";
import supabase from "../index";

export function createProfile(data: Array<any>) {
  let filename = data[0].avatar_url;
  const profile: Profile = {
    id: data[0].id,
    uid: data[0].uid,
    name: data[0].name,
    avatar: filename && {
      url: supabase.storage.from("avatars").getPublicUrl(filename).publicURL,
      filename,
    },
  };

  return profile;
}
