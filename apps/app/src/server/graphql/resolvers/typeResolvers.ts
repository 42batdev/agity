import {
  Member,
  MemberResolvers,
  Profile,
  ProfileResolvers,
  Team,
  TeamPermission,
  TeamResolvers,
} from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError, logSupabaseData } from "../../../supabase/pql";
import { createProfile } from "../../../supabase/pql/profiles";
import {
  createMember,
  createTeam,
  createTeamPermission,
} from "../../../supabase/pql/teams";

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
  members(team, _) {
    return supabase
      .from("members")
      .select("*")
      .match({ team_id: team.id })
      .then(handleSupabaseError)
      .then(({ data }) => data.map((aData) => createMember(aData))) as Promise<
      Member[]
    >;
  },
};

export const memberResolvers: MemberResolvers = {
  profile(member) {
    return supabase
      .from("profiles")
      .select("*")
      .match({ id: member.profile.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0])) as Promise<Profile>;
  },
};
