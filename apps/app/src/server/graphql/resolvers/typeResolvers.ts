import {
  Profile,
  ProfileResolvers,
  Team,
  TeamPermission,
  TeamResolvers,
} from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError, logSupabaseData } from "../../../supabase/pql";
import { createTeam, createTeamPermission } from "../../../supabase/pql/teams";

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

export const teamResolvers: TeamResolvers = {
  myPermissions(team, _, { user }) {
    return supabase
      .from("members")
      .select("permission_level")
      .match({ team_id: team.id, user_id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) =>
        createTeamPermission(data[0])
      ) as Promise<TeamPermission>;
  },
};
