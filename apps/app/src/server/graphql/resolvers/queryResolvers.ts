import { PostgrestResponse } from "@supabase/supabase-js";
import { QueryResolvers, Profile } from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError } from "../../../supabase/pql";
import { createProfile } from "../../../supabase/pql/profiles";

export const queryResolvers: QueryResolvers = {
  getProfile(parent, { id }) {
    return supabase
      .from("profiles")
      .select("id, uid, name, avatar_url")
      .match({ id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data)) as Promise<Profile>;
  },
};
