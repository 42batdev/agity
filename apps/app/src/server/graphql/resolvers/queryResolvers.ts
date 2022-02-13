import { QueryResolvers } from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError, logSupabaseData } from "../../../supabase/pql";
import { createProfile } from "../../../supabase/pql/profiles";
import { createTeam } from "../../../supabase/pql/teams";

export const profileQueryResolvers: QueryResolvers = {
  async getUserProfile(parent, args, { user }) {
    const profile = await supabase
      .from("profiles")
      .select("*")
      .match({ id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0]));

    profile.teams = await supabase
      .from("teams")
      .select("*")
      .then(handleSupabaseError)
      .then(({ data }) => data.map((aData) => createTeam(aData)));

    return profile;
  },
};
