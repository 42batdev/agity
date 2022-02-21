import { useGetTeamByTidQuery } from "../../../generated/graphql";
import { useTid } from "../dashboard/TeamNavigationContext";
import MemberCard from "./MemberCard";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

export const MemberList = () => {
  const { loading, data } = useGetTeamByTidQuery({
    variables: { tid: useTid() },
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      {!loading &&
        data &&
        data.getTeam &&
        data.getTeam?.members?.map((member) => (
          <MemberCard
            key={member.profile.uid}
            team={data.getTeam!}
            profile={member.profile}
            permission={member.permission}
          />
        ))}
    </SimpleGrid>
  );
};
