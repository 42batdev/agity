import {
  Member,
  MemberResolvers,
  Profile,
  ProfileResolvers,
  Team,
  TeamPermission,
  TeamResolvers,
} from "../../../../generated/graphql";
import { handleSupabaseError } from "../../supabase";
import { createProfile } from "./factories/profiles";
import {
  createMember,
  createTeam,
  createTeamPermission,
} from "./factories/teams";

export const profileResolvers: ProfileResolvers = {
  teams(team, _, { supabase }) {
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
  myPermissions(team, _, { supabase, user }) {
    return supabase
      .from("members")
      .select("permission_level")
      .match({ team_id: team.id, user_id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) =>
        createTeamPermission(data[0])
      ) as Promise<TeamPermission>;
  },
  members(team, _, { supabase }) {
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
  profile(member, _, { supabase }) {
    return supabase
      .from("profiles")
      .select("*")
      .match({ id: member.profile.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(supabase, data[0])) as Promise<Profile>;
  },
};
