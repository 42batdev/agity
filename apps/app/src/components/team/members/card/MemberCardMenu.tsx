import {
  PermissionLevel,
  useRemoveFromTeamMutation,
  useUpdateMemberPermissionMutation,
} from "../../../../generated/graphql";
import { useAlertDialog } from "../../../layout/PageContext";
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
  const [mutateUpdateMemberPermission] = useUpdateMemberPermissionMutation();
  const [mutateRemoveFromTeam] = useRemoveFromTeamMutation();

  const openAlertDialog = useAlertDialog();

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
            openAlertDialog({
              title: "",
              onConfirm: () =>
                mutateRemoveFromTeam({
                  variables: {
                    input: {
                      teamId: team.id,
                      profileId: profile.id,
                    },
                  },
                }).then(onClose),
              onCancel: onClose,
            });
          }}
        >
          Remove from Team
        </Button>
      )}

      <CloseButton onClick={onClose} />
    </VStack>
  );
}
