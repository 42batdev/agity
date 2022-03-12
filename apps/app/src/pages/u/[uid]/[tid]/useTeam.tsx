import { useGetTeamQuery } from "../../../../generated/graphql";
import { useTeamId } from "./TeamNavigationContext";

export const useTeam = () => {
  return useGetTeamQuery({
    variables: { id: useTeamId() },
  });
};
