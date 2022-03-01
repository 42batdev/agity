import { canEditTeam } from "../../../../functions/permissions";
import { Profile, Team, TeamPermission } from "../../../../generated/graphql";
import { useUser } from "../../../../supabase/AuthContext";
import MemberCardContent from "./MemberCardContent";
import { MemberCardMenu } from "./MemberCardMenu";
import {
  Avatar,
  Box,
  Heading,
  Skeleton,
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
      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Avatar
            size="xl"
            src={profile.avatar?.url ?? undefined}
            color="gray.100"
            border="2px solid white"
          />
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"} pt="8">
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

export function MemberCardSkeleton() {
  return (
    <Skeleton>
      <MemberCardContent disabled>
        <p>LOADING</p>
      </MemberCardContent>
    </Skeleton>
  );
}
