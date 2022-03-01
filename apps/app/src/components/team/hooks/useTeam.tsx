import { useGetTeamByTidQuery } from "../../../generated/graphql";
import { useTid } from "../dashboard/TeamNavigationContext";

export const useTeam = () => {
  return useGetTeamByTidQuery({
    variables: { tid: useTid() },
  });
};
