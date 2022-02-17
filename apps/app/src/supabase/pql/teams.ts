import { PermissionLevel, Team, TeamPermission } from "../../generated/graphql";
import supabase from "../index";

export function checkTidExists(tid: string) {
  return supabase
    .from("teams")
    .select("id", { count: "exact", head: true })
    .match({ tid: tid.toLowerCase() })
    .then((result) => result.count ?? 0 > 0) as Promise<boolean>;
}

export function createTeam(data: any): Team {
  return {
    id: data.id,
    tid: data.tid,
    name: data.name,
    myPermissions: {
      permissionLevel: "" as PermissionLevel,
    },
  };
}

export function createTeamPermission(data: any): TeamPermission {
  let permissionLevel;
  switch (data.permission_level) {
    case "owner":
      permissionLevel = PermissionLevel.OWNER;
      break;
    case "member":
    default:
      permissionLevel = PermissionLevel.MEMBER;
  }
  return {
    permissionLevel,
  };
}