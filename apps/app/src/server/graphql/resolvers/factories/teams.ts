import {
  Member,
  PermissionLevel,
  Profile,
  Team,
  TeamPermission,
} from "../../../../generated/graphql";

export function createTeam(data: any): Team {
  return {
    id: data.id,
    tid: data.tid,
    uid: data.uid,
    name: data.name,
    myPermissions: {
      permissionLevel: "" as PermissionLevel,
    },
    members: [],
  };
}

export function createMember(data: any): Member {
  return {
    profile: { id: data.user_id } as Profile,
    permission: createTeamPermission(data),
  };
}

export function createTeamPermission(data: any): TeamPermission {
  return {
    permissionLevel: PermissionLevel[data.permission_level],
  };
}
