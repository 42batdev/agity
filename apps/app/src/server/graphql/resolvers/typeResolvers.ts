import {
  Member,
  MemberResolvers,
  Profile,
  ProfileResolvers,
  Team,
  TeamPermission,
  TeamResolvers,
} from "../../../generated/graphql";
import supabaseSSR, { handleSupabaseError } from "../../ssr/supabase";
import { createProfile } from "./factories/profiles";
import {
  createMember,
  createTeam,
  createTeamPermission,
} from "./factories/teams";

export const profileResolvers: ProfileResolvers = {
  teams() {
    return supabaseSSR
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
    return supabaseSSR
      .from("members")
      .select("permission_level")
      .match({ team_id: team.id, user_id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) =>
        createTeamPermission(data[0])
      ) as Promise<TeamPermission>;
  },
  members(team, _) {
    return supabaseSSR
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
    return supabaseSSR
      .from("profiles")
      .select("*")
      .match({ id: member.profile.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0])) as Promise<Profile>;
  },
};
