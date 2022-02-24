import {
  PermissionLevel,
  useRemoveFromTeamMutation,
  useUpdateMemberPermissionMutation,
} from "../../../../generated/graphql";
import { useUser } from "../../../../supabase/AuthContext";
import { MemberCardProps } from "./MemberCard";
import { Button, CloseButton, VStack } from "@chakra-ui/react";

export interface MemberCardMenuProps extends MemberCardProps {
  onClose: () => void;
}

export function MemberCardMenu({
  permissions,
  team,
  profile,
  onClose,
}: MemberCardMenuProps) {
  const user = useUser();

  const [mutateUpdateMemberPermission] = useUpdateMemberPermissionMutation();
  const [mutateRemoveFromTeam] = useRemoveFromTeamMutation();

  return (
    <VStack
      position="absolute"
      top="0"
      w="100%"
      h="100%"
      bg="blackAlpha.800"
      justifyContent={"center"}
    >
      {permissions.permissionLevel === PermissionLevel.MEMBER && (
        <Button
          variant={"solid"}
          onClick={() => {
            mutateUpdateMemberPermission({
              variables: {
                input: {
                  teamId: team.id,
                  profileId: profile.id,
                  permissionLevel: PermissionLevel.ADMIN,
                },
              },
            }).then(onClose);
          }}
        >
          Promote to Admin
        </Button>
      )}
      {permissions.permissionLevel === PermissionLevel.ADMIN && (
        <Button
          variant={"solid"}
          onClick={() => {
            mutateUpdateMemberPermission({
              variables: {
                input: {
                  teamId: team.id,
                  profileId: profile.id,
                  permissionLevel: PermissionLevel.MEMBER,
                },
              },
            }).then(onClose);
          }}
        >
          Demote to Member
        </Button>
      )}
      {permissions.permissionLevel !== PermissionLevel.OWNER && (
        <Button
          variant={"solid"}
          onClick={() => {
            mutateRemoveFromTeam({
              variables: {
                input: {
                  teamId: team.id,
                  profileId: profile.id,
                },
              },
            }).then(onClose);
          }}
        >
          Remove from Team
        </Button>
      )}

      <CloseButton onClick={onClose} />
    </VStack>
  );
}
