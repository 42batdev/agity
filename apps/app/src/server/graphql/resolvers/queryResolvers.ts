import { QueryResolvers } from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError } from "../../../supabase/pql";
import { createProfile } from "../../../supabase/pql/profiles";
import { createTeam } from "../../../supabase/pql/teams";

export const profileQueryResolvers: QueryResolvers = {
  async getUserProfile(parent, args, { user }) {
    return await supabase
      .from("profiles")
      .select("*")
      .match({ id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0]));
  },
};

export const teamQueryResolvers: QueryResolvers = {
  async getTeam(parent, { tid }, { user }) {
    return await supabase
      .from("teams")
      .select("*")
      .match({ tid })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0]));
  },
};
