import { Member, Team } from "../../../../generated/graphql";
import Card from "../../../common/card/Card";
import { MemberCardMenu } from "./MemberCardMenu";
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

export interface MemberCardProps {
  team: Pick<Team, "id" | "myPermissions">;
  member: Pick<Member, "profile" | "permission">;
  disabled: boolean;
}

export function MemberCard(props: MemberCardProps) {
  const { member, disabled } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover
      onOpen={() => !disabled && onOpen()}
      onClose={onClose}
      isOpen={isOpen}
      closeOnBlur
      closeOnEsc
    >
      <PopoverTrigger>
        <Box>
          <Card
            title={member.profile.name}
            description={member.permission.permissionLevel}
            avatarProps={{
              src: member.profile.avatar?.url ?? undefined,
            }}
            onClick={disabled ? undefined : () => {}}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Edit Team Member</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton onClick={onClose} />
        <PopoverBody>
          <MemberCardMenu {...props} onClose={onClose} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
