import { Profile } from "../../../../generated/graphql";
import supabaseSSR from "../../../ssr/supabase";

export async function createProfile(data: any) {
  let filename = data.avatar_url;
  const profile: Profile = {
    id: data.id,
    uid: data.uid,
    name: data.name,
    avatar: filename && {
      url: (
        await supabaseSSR.storage.from("avatars").createSignedUrl(filename, 60)
      ).signedURL,
      filename,
    },
    teams: [],
  };

  return profile;
}

export async function createSearchProfilesResult(data: any[], count: number) {
  return {
    profiles: await Promise.all(data.map((aData) => createProfile(aData))),
    count,
  };
}
