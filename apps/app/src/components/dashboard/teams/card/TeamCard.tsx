import { useAgityRouter } from "../../../../functions/links";
import { PermissionLevel, Team } from "../../../../generated/graphql";
import Card from "../../../common/card/Card";
import { TeamCardMenu } from "./TeamCardMenu";
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export interface TeamCardProps {
  team: Pick<Team, "id" | "uid" | "tid" | "name" | "myPermissions">;
}

export function TeamCard(props: TeamCardProps) {
  const { team } = props;

  const router = useAgityRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isInvited =
    team.myPermissions.permissionLevel === PermissionLevel.INVITED;
  return (
    <Popover
      onOpen={() => isInvited && onOpen()}
      onClose={onClose}
      isOpen={isOpen}
      closeOnBlur
      closeOnEsc
    >
      <PopoverTrigger>
        <Box>
          <Card
            title={team.name}
            description={team.myPermissions.permissionLevel}
            onClick={() => {
              if (!isInvited) router.openTeamDashboard(team);
            }}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Team Invitation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton onClick={onClose} />
        <PopoverBody>
          <TeamCardMenu {...props} onClose={onClose} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
