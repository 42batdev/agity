import { useUserProfileQuery } from "../../generated/graphql";
import { useUser } from "../../supabase/AuthContext";

export const useActiveUserProfileQuery = () => {
  const user = useUser();
  return useUserProfileQuery({
    variables: { id: user?.id },
  });
};