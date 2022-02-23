import {
  PermissionLevel,
  useUpdateMemberPermissionMutation,
} from "../../../../generated/graphql";
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
  const [mutate] = useUpdateMemberPermissionMutation();

  const demoteToMember = () => {
    mutate({
      variables: {
        input: {
          teamId: team.id,
          profileId: profile.id,
          permissionLevel: PermissionLevel.MEMBER,
        },
      },
    }).then(onClose);
  };
  const promoteToAdmin = () => {
    mutate({
      variables: {
        input: {
          teamId: team.id,
          profileId: profile.id,
          permissionLevel: PermissionLevel.ADMIN,
        },
      },
    }).then(onClose);
  };

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
        <Button variant={"solid"} onClick={promoteToAdmin}>
          Promote to Admin
        </Button>
      )}
      {permissions.permissionLevel === PermissionLevel.ADMIN && (
        <Button variant={"solid"} onClick={demoteToMember}>
          Demote to Member
        </Button>
      )}

      <CloseButton onClick={onClose} />
    </VStack>
  );
}
