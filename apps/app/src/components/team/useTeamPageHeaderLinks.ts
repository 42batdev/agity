import {
  getTeamDashboardLink,
  getTeamMembersLink,
  getTeamSettingsLink,
  getUserDashboardLink,
  useAgityRouter,
} from "../../functions/links";
import { useUserProfileQuery } from "../../generated/graphql";
import { useTeam } from "./useTeam";

export function useTeamPageHeaderLinks() {
  const router = useAgityRouter();

  const { data: profileData, loading: profileLoading } = useUserProfileQuery();
  const { data: teamData, loading: teamLoading } = useTeam();

  if (
    !teamLoading &&
    teamData &&
    teamData.getTeam &&
    !profileLoading &&
    profileData &&
    profileData.getUserProfile
  ) {
    const team = teamData.getTeam;
    return {
      links: [
        {
          title: "Overview",
          active: router.asPath === getTeamDashboardLink(team),
          onNavigate: () => router.openTeamDashboard(team),
        },
        {
          title: "Members",
          active: router.asPath === getTeamMembersLink(team),
          onNavigate: () => router.openTeamMembers(team),
        },
        {
          title: "Settings",
          active: router.asPath === getTeamSettingsLink(team),
          onNavigate: () => router.openTeamSettings(team),
        },
      ],
      breadcrumbs: [
        {
          title: profileData.getUserProfile.name,
          active: router.asPath === getUserDashboardLink(),
          onNavigate: () => router.openUserDashboard(),
        },
        {
          title: teamData.getTeam.name,
          active: router.asPath === getTeamDashboardLink(team),
          onNavigate: () => router.openTeamDashboard(team),
        },
      ],
    };
  }

  return { links: [], breadcrumbs: [] };
}
