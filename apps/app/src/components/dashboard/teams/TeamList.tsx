import {
  useGetUserTeamsQuery,
  useUserProfileQuery,
} from "../../../generated/graphql";
import Card from "../../common/card/Card";
import { CardGrid } from "../../common/card/CardGrid";
import { useRouter } from "next/router";

export const TeamList = () => {
  const router = useRouter();

  const { data: userData } = useUserProfileQuery();
  const { data: teamsData, loading } = useGetUserTeamsQuery();

  return (
    <CardGrid loading={loading}>
      {teamsData &&
        teamsData.getUserProfile?.teams?.map((team) => (
          <Card
            key={team.id}
            title={team.name}
            description={team.myPermissions.permissionLevel}
            onClick={() => {
              router.push(`/u/${userData?.getUserProfile?.uid}/${team.tid}`);
            }}
          />
        ))}
    </CardGrid>
  );
};
