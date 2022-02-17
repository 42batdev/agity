import { Profile, ProfileResolvers, Team } from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError } from "../../../supabase/pql";
import { createTeam } from "../../../supabase/pql/teams";

export const profileResolvers: ProfileResolvers = {
  teams() {
    return supabase
      .from("teams")
      .select("*")
      .then(handleSupabaseError)
      .then(({ data }) => data.map((aData) => createTeam(aData))) as Promise<
      Team[]
    >;
  },
};
