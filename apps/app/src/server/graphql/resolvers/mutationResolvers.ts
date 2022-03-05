import {
  MutationResolvers,
  PermissionLevel,
  Profile,
  Team,
} from "../../../generated/graphql";
import supabaseSSR, {
  handleSupabaseError,
  supabaseSSRServiceRole,
} from "../../ssr/supabase";
import { validateId } from "../errors";
import { createProfile } from "./factories/profiles";
import { createTeam } from "./factories/teams";
import { randomUUID } from "crypto";

export const profileMutationResolvers: MutationResolvers = {
  createUserProfile: (parent, { input }, { user }) => {
    validateId(input.uid);

    let create: any = {
      id: user.id,
      uid: input.uid,
      name: input.name ?? "Anonymous",
    };

    return supabaseSSR
      .from("profiles")
      .insert({ ...create })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0])) as Promise<Profile>;
  },
  updateUserProfile: (parent, { input }, { user }) => {
    let update = {};
    if (input.uid !== undefined) {
      validateId(input.uid);
      update = { ...update, uid: input.uid };
    }
    if (input.name !== undefined) update = { ...update, name: input.name };
    if (input.avatar !== undefined) {
      const avatar_url = input.avatar === null ? null : input.avatar.filename;
      update = { ...update, avatar_url };
    }

    return supabaseSSR
      .from("profiles")
      .update({ ...update })
      .match({ id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0])) as Promise<Profile>;
  },
};

export const teamMutationResolvers: MutationResolvers = {
  createTeam: async (parent, { input }, { user }) => {
    let newTeamUUID = randomUUID();
    let teamInsertValues: any = { id: newTeamUUID };
    if (input.tid !== undefined) {
      validateId(input.tid);
      teamInsertValues = { ...teamInsertValues, tid: input.tid };
    }
    if (input.name !== undefined)
      teamInsertValues = { ...teamInsertValues, name: input.name };

    const team = await supabaseSSRServiceRole
      .from("teams")
      .insert({ ...teamInsertValues })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0]));

    await supabaseSSRServiceRole.from("members").insert(
      {
        team_id: newTeamUUID,
        user_id: user.id,
        permission_level: "OWNER",
      },
      { returning: "minimal" }
    );

    return team;
  },
  updateTeam: (parent, { input }) => {
    let update = {};
    if (input.tid !== undefined) {
      validateId(input.tid);
      update = { ...update, tid: input.tid };
    }
    if (input.name !== undefined) update = { ...update, name: input.name };

    return supabaseSSR
      .from("teams")
      .update({ ...update })
      .match({ id: input.id })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0])) as Promise<Team>;
  },
  inviteMembers: async (parent, { input }) => {
    const insert: any[] = [];
    input.profileIds?.forEach((id) =>
      insert.push({
        team_id: input.teamId,
        user_id: id,
        permission_level: PermissionLevel.INVITED,
      })
    );

    await supabaseSSR
      .from("members")
      .insert(insert, { returning: "minimal" })
      .then(handleSupabaseError);

    return await supabaseSSR
      .from("teams")
      .select("*")
      .match({ id: input.teamId })
      .then(handleSupabaseError)
      .then(({ data }) => {
        if (data.length > 0) {
          return createTeam(data[0]);
        } else {
          return null;
        }
      });
  },
  removeMember: async (parent, { input }, { user }) => {
    await supabaseSSR
      .from("members")
      .delete({ returning: "minimal" })
      .match({ user_id: input.profileId, team_id: input.teamId })
      .then(handleSupabaseError);

    return await supabaseSSR
      .from("teams")
      .select("*")
      .match({ id: input.teamId })
      .then(handleSupabaseError)
      .then(({ data }) => {
        if (data.length > 0) {
          return createTeam(data[0]);
        } else {
          return null;
        }
      });
  },
  updateMemberPermission: async (parent, { input }) => {
    await supabaseSSR
      .from("members")
      .update({ permission_level: input.permissionLevel })
      .match({ team_id: input.teamId, user_id: input.profileId })
      .then(handleSupabaseError);

    return await supabaseSSR
      .from("teams")
      .select("*")
      .match({ id: input.teamId })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0]));
  },
};
