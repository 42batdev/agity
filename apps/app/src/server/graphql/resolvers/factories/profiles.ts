import { Profile } from "../../../../generated/graphql";
import { supabaseServerClient } from "@supabase/supabase-auth-helpers/nextjs";
import { SupabaseClient } from "@supabase/supabase-js";

export async function createProfile(supabase: SupabaseClient, data: any) {
  let filename = data.avatar_url;
  const profile: Profile = {
    id: data.id,
    uid: data.uid,
    name: data.name,
    avatar: filename && {
      url: (
        await supabase.storage.from("avatars").createSignedUrl(filename, 60)
      ).signedURL,
      filename,
    },
    teams: [],
  };

  return profile;
}

export async function createSearchProfilesResult(
  supabase: SupabaseClient,
  data: any[],
  count: number
) {
  return {
    profiles: await Promise.all(
      data.map((aData) => createProfile(supabase, aData))
    ),
    count,
  };
}
