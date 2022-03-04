import { canEditTeam } from "../../../functions/permissions";
import { useUser } from "../../../supabase/AuthContext";
import { CardGrid } from "../../common/card/CardGrid";
import { useTeam } from "../hooks/useTeam";
import { MemberCard } from "./card/MemberCard";
import React from "react";

export const MemberList = () => {
  const user = useUser();
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
                disabled={
                  !canEditTeam(data.getTeam.myPermissions) ||
                  member.profile.id === user.id
                }
              />
            );
          }
        })}
    </CardGrid>
  );
};
