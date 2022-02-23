import { PermissionLevel, TeamPermission } from "../generated/graphql";

export function canEditTeam(permissions: TeamPermission) {
  return (
    permissions.permissionLevel === PermissionLevel.OWNER ||
    permissions.permissionLevel === PermissionLevel.ADMIN
  );
}
