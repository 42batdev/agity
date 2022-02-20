import {
  useGetUserTeamsQuery,
  useUserProfileQuery,
} from "../../../generated/graphql";
import TeamCard, { TeamCardSkeleton } from "./TeamCard";
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiUsers } from "react-icons/fi";

export const TeamList = () => {
  const router = useRouter();

  const { data: userData } = useUserProfileQuery();
  const { data: teamsData, loading } = useGetUserTeamsQuery();

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      {loading && (
        <>
          <TeamCardSkeleton />
          <TeamCardSkeleton />
        </>
      )}
      {!loading &&
        teamsData &&
        teamsData.getUserProfile?.teams?.map((team) => (
          <TeamCard
            key={team.id}
            name={team.name}
            permissionLevel={team.myPermissions.permissionLevel}
            onClick={() => {
              router.push(`/u/${userData?.getUserProfile?.uid}/${team.tid}`);
            }}
          />
        ))}
    </SimpleGrid>
  );
};
