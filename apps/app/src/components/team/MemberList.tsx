import { SimpleGrid } from "@chakra-ui/react";
import MemberCard from "./MemberCard";
import React from "react";
import { useTeam } from "./TeamContextProvider";
import { useMembersQuery } from "supabase";

export const MemberList = () => {
  const team = useTeam();

  const { isLoading, data } = useMembersQuery(team);
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      {!isLoading &&
        data &&
        data.map((profile) => (
          <MemberCard
            key={profile.uid}
            name={profile.name}
            avatarURL={profile.avatar.url}
          />
        ))}
    </SimpleGrid>
  );
};
