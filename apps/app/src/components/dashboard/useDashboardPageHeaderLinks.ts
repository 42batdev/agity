import {
  getUserDashboardLink,
  getUserSettingsLink,
  useAgityRouter,
} from "../../functions/links";
import { useUserProfileQuery } from "../../generated/graphql";

export function useUserPageHeaderLinks() {
  const router = useAgityRouter();

  const { data: profileData, loading: profileLoading } = useUserProfileQuery();

  if (!profileLoading && profileData && profileData.getUserProfile) {
    const profile = profileData.getUserProfile;

    return {
      links: [
        {
          title: "Overview",
          active: router.asPath === getUserDashboardLink(),
          onNavigate: () => router.openUserDashboard(),
        },
        {
          title: "Settings",
          active: router.asPath === getUserSettingsLink(),
          onNavigate: () => router.openUserSettings(),
        },
      ],
      breadcrumbs: [
        {
          title: profile.name,
          active: router.asPath === getUserDashboardLink(),
          onNavigate: () => router.openUserDashboard(),
        },
      ],
    };
  }

  return { links: [], breadcrumbs: [] };
}
