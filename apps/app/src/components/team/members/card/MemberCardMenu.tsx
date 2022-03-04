import {
  PermissionLevel,
  useRemoveFromTeamMutation,
  useUpdateMemberPermissionMutation,
} from "../../../../generated/graphql";
import { useAlertDialog } from "../../../common/layout/page/PageContext";
import { MemberCardProps } from "./MemberCard";
import { Button, VStack } from "@chakra-ui/react";

export interface MemberCardMenuProps extends MemberCardProps {
  onClose: () => void;
}

export function MemberCardMenu({ member, team, onClose }: MemberCardMenuProps) {
  const [mutateUpdateMemberPermission] = useUpdateMemberPermissionMutation();
  const [mutateRemoveFromTeam] = useRemoveFromTeamMutation();

  const openAlertDialog = useAlertDialog();

  return (
    <VStack justifyContent={"center"}>
      {member.permission.permissionLevel === PermissionLevel.MEMBER && (
        <Button
          variant={"solid"}
          onClick={() => {
            mutateUpdateMemberPermission({
              variables: {
                input: {
                  teamId: team.id,
                  profileId: member.profile.id,
                  permissionLevel: PermissionLevel.ADMIN,
                },
              },
            }).then(onClose);
          }}
          isFullWidth
        >
          Promote to Admin
        </Button>
      )}
      {member.permission.permissionLevel === PermissionLevel.ADMIN && (
        <Button
          variant={"solid"}
          onClick={() => {
            mutateUpdateMemberPermission({
              variables: {
                input: {
                  teamId: team.id,
                  profileId: member.profile.id,
                  permissionLevel: PermissionLevel.MEMBER,
                },
              },
            }).then(onClose);
          }}
          isFullWidth
        >
          Demote to Member
        </Button>
      )}
      {member.permission.permissionLevel !== PermissionLevel.OWNER && (
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
                      profileId: member.profile.id,
                    },
                  },
                }).then(onClose),
              onCancel: onClose,
            });
          }}
          isFullWidth
        >
          Remove from Team
        </Button>
      )}
    </VStack>
  );
}
