import { useGetUserTeamsQuery } from "../../../generated/graphql";
import { CardGrid } from "../../common/card/CardGrid";
import { TeamCard } from "./card/TeamCard";

export const TeamList = () => {
  const { data: teamsData, loading } = useGetUserTeamsQuery();

  return (
    <CardGrid loading={loading}>
      {teamsData &&
        teamsData.getUserProfile?.teams?.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
    </CardGrid>
  );
};
