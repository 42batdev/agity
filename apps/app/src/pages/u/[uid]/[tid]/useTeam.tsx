import { useGetTeamQuery } from "../../../../generated/graphql";
import { useTid, useUid } from "./TeamNavigationContext";

export const useTeam = () => {
  return useGetTeamQuery({
    variables: {
      input: {
        uidtid: {
          uid: useUid(),
          tid: useTid(),
        },
      },
    },
  });
};
