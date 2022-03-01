import { useTeam } from "../hooks/useTeam";
import MemberCard, { MemberCardSkeleton } from "./card/MemberCard";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

export const MemberList = () => {
  const { loading, data } = useTeam();

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      {loading && (
        <>
          <MemberCardSkeleton />
          <MemberCardSkeleton />
          <MemberCardSkeleton />
          <MemberCardSkeleton />
        </>
      )}
      {!loading &&
        data &&
        data.getTeam &&
        data.getTeam.members.map((member) => {
          if (data.getTeam) {
            return (
              <MemberCard
                key={member.profile.uid}
                team={data.getTeam}
                profile={member.profile}
                permissions={member.permission}
              />
            );
          }
        })}
    </SimpleGrid>
  );
};
