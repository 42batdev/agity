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

function AcceptButton({ team }: TeamCardMenuProps) {
  return (
    <Button variant={"solid"} onClick={() => {}} isFullWidth>
      Accept
    </Button>
  );
}

function DeclineButton({ team }: TeamCardMenuProps) {
  return (
    <Button variant={"solid"} onClick={() => {}} isFullWidth>
      Decline
    </Button>
  );
}
