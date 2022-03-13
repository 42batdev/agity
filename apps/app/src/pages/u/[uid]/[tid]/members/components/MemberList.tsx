import { CardGrid } from "../../../../../../components/card/CardGrid";
import { canEditTeam } from "../../../../../../functions/permissions";
import { useTeam } from "../../useTeam";
import { MemberCard } from "./card/MemberCard";
import React from "react";

export const MemberList = () => {
  const { loading, data } = useTeam();

  return (
    <CardGrid loading={loading}>
      {data &&
        data.getTeam &&
        data.getTeam.members.map((member) => {
          if (data.getTeam) {
            return (
              <MemberCard
                key={member.profile.id}
                team={data.getTeam}
                member={member}
                disabled={!canEditTeam(data.getTeam.myPermissions)}
              />
            );
          }
        })}
    </CardGrid>
  );
};
