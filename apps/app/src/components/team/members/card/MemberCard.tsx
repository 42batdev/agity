import { canEditTeam } from "../../../../functions/permissions";
import { Profile, Team, TeamPermission } from "../../../../generated/graphql";
import { useUser } from "../../../../supabase/AuthContext";
import MemberCardContent from "./MemberCardContent";
import { MemberCardMenu } from "./MemberCardMenu";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export interface MemberCardProps {
  team: Pick<Team, "id" | "myPermissions">;
  profile: Pick<Profile, "id" | "name" | "avatar">;
  permissions: Pick<TeamPermission, "permissionLevel">;
}

export default function MemberCard({
  team,
  profile,
  permissions,
}: MemberCardProps) {
  const user = useUser();
  const { isOpen: isMenuOpen, onToggle: onToggleMenu } = useDisclosure();
  const isDisabled = !canEditTeam(team.myPermissions) || profile.id === user.id;

  return (
    <MemberCardContent disabled={isDisabled} onClick={onToggleMenu}>
      <Image
        h="120px"
        w="full"
        src={
          "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        }
        objectFit="cover"
      />
      <Flex justify="center" mt="-12">
        <Avatar
          size="xl"
          src={profile.avatar?.url ?? undefined}
          color="gray.100"
          border="2px solid white"
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {profile.name}
          </Heading>
          <Text color={"gray.500"}>{permissions.permissionLevel}</Text>
        </Stack>
      </Box>
      {isMenuOpen && (
        <MemberCardMenu
          onClose={onToggleMenu}
          permissions={permissions}
          team={team}
          profile={profile}
        />
      )}
    </MemberCardContent>
  );
}
