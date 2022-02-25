import {
  MutationResolvers,
  PermissionLevel,
  Profile,
} from "../../../generated/graphql";
import supabase, { supabaseServiceRole } from "../../../supabase";
import { handleSupabaseError } from "../../../supabase/pql";
import { createProfile } from "../../../supabase/pql/profiles";
import { createTeam } from "../../../supabase/pql/teams";
import { validateId } from "../errors";
import { randomUUID } from "crypto";

export const profileMutationResolvers: MutationResolvers = {
  createUserProfile: (parent, { input }, { user }) => {
    validateId(input.uid);

    let create: any = {
      id: user.id,
      uid: input.uid,
      name: input.name ?? "Anonymous",
    };

    return supabase
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

    return supabase
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

    const team = await supabaseServiceRole
      .from("teams")
      .insert({ ...teamInsertValues })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0]));

    await supabaseServiceRole.from("members").insert(
      {
        team_id: newTeamUUID,
        user_id: user.id,
        permission_level: "OWNER",
      },
      { returning: "minimal" }
    );

    return team;
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

    await supabase
      .from("members")
      .insert(insert, { returning: "minimal" })
      .then(handleSupabaseError);

    return await supabase
      .from("teams")
      .select("*")
      .match({ id: input.teamId })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0]));
  },
  updateMemberPermission: async (parent, { input }) => {
    await supabase
      .from("members")
      .update({ permission_level: input.permissionLevel })
      .match({ team_id: input.teamId, user_id: input.profileId })
      .then(handleSupabaseError);

    return await supabase
      .from("teams")
      .select("*")
      .match({ id: input.teamId })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0]));
  },
};
