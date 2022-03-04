import { useGetTeamByTidQuery } from "../../../generated/graphql";
import { useTeamId } from "../dashboard/TeamNavigationContext";

export const useTeam = () => {
  return useGetTeamByTidQuery({
    variables: { id: useTeamId() },
  });
};
