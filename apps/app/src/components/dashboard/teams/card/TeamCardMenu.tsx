import {
  GetUserTeamsDocument,
  PermissionLevel,
  useRemoveFromTeamMutation,
  useUpdateMemberPermissionMutation,
} from "../../../../generated/graphql";
import { useUser } from "../../../../supabase/AuthContext";
import { TeamCardProps } from "./TeamCard";
import { Button, HStack } from "@chakra-ui/react";

export interface TeamCardMenuProps extends TeamCardProps {
  onClose: () => void;
}

export function TeamCardMenu(props: TeamCardMenuProps) {
  return (
    <HStack>
      <AcceptButton {...props} />
      <DeclineButton {...props} />
    </HStack>
  );
}

function AcceptButton({ team, onClose }: TeamCardMenuProps) {
  const user = useUser();
  const [mutate] = useUpdateMemberPermissionMutation({
    variables: {
      input: {
        teamId: team.id,
        profileId: user.id,
        permissionLevel: PermissionLevel.MEMBER,
      },
    },
  });
  return (
    <Button
      variant={"solid"}
      onClick={() => {
        mutate().then(onClose);
      }}
      isFullWidth
    >
      Accept
    </Button>
  );
}

function DeclineButton({ team, onClose }: TeamCardMenuProps) {
  const user = useUser();
  const [mutate] = useRemoveFromTeamMutation({
    variables: { input: { teamId: team.id, profileId: user.id } },
    refetchQueries: [GetUserTeamsDocument],
  });
  return (
    <Button
      variant={"solid"}
      onClick={() => {
        mutate().then(onClose);
      }}
      isFullWidth
    >
      Decline
    </Button>
  );
}
