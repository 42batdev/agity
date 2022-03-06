import { useGetTeamByTidQuery } from "../../generated/graphql";
import { useTeamId } from "./TeamNavigationContext";

export const useTeam = () => {
  return useGetTeamByTidQuery({
    variables: { id: useTeamId() },
  });
};
