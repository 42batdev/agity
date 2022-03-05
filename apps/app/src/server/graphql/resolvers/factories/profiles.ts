import { Profile } from "../../../../generated/graphql";
import supabase from "../../../../supabase";

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
