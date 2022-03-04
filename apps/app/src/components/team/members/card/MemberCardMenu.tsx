import {
  PermissionLevel,
  useRemoveFromTeamMutation,
  useUpdateMemberPermissionMutation,
} from "../../../../generated/graphql";
import { useUser } from "../../../../supabase/AuthContext";
import { useAlertDialog } from "../../../common/layout/page/PageContext";
import { MemberCardProps } from "./MemberCard";
import { Button, Text, VStack } from "@chakra-ui/react";

export interface MemberCardMenuProps extends MemberCardProps {
  onClose: () => void;
}

export function MemberCardMenu(props: MemberCardMenuProps) {
  const { member, team, onClose } = props;
  const user = useUser();

  if (member.permission.permissionLevel === PermissionLevel.OWNER) {
    return <Text>The owner can not be edited.</Text>;
  } else if (member.profile.id === user.id) {
    return <Text>You can not edit your own membership.</Text>;
  } else {
    return (
      <VStack>
        {member.permission.permissionLevel === PermissionLevel.MEMBER && (
          <PromoteButton {...props} />
        )}
        {member.permission.permissionLevel === PermissionLevel.ADMIN && (
          <DemoteButton {...props} />
        )}
        <DeleteButton {...props} />
      </VStack>
    );
  }
}

function PromoteButton({ team, member, onClose }: MemberCardMenuProps) {
  const [mutateUpdateMemberPermission] = useUpdateMemberPermissionMutation();

  return (
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
  );
}

function DemoteButton({ team, member, onClose }: MemberCardMenuProps) {
  const [mutateUpdateMemberPermission] = useUpdateMemberPermissionMutation();

  return (
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
  );
}

function DeleteButton({ team, member, onClose }: MemberCardMenuProps) {
  const [mutateRemoveFromTeam] = useRemoveFromTeamMutation();

  const openAlertDialog = useAlertDialog();

  return (
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
  );
}
