import { PostgrestResponse } from "@supabase/supabase-js";
import {
  QueryResolvers,
  Profile,
  Team,
  MutationResolvers,
} from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError } from "../../../supabase/pql";
import { createProfile } from "../../../supabase/pql/profiles";
import { createTeam } from "../../../supabase/pql/teams";

export const profileQueryResolvers: QueryResolvers = {
  getProfile(parent, { id }) {
    return supabase
      .from("profiles")
      .select("id, uid, name, avatar_url")
      .match({ id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0])) as Promise<Profile>;
  },
};

export const teamQueryResolvers: QueryResolvers = {
  getTeams() {
    return supabase
      .from("teams")
      .select("id, tid, name")
      .then(handleSupabaseError)
      .then(({ data }) => data.map((aData) => createTeam(aData))) as Promise<
      Team[]
    >;
  },
};
