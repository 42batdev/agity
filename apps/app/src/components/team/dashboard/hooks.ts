import {
  getTeamDashboardLink,
  getTeamMembersLink,
  getTeamSettingsLink,
} from "../../../functions/links";
import { useUserProfileQuery } from "../../../generated/graphql";
import { useTeam } from "../hooks/useTeam";

export function useTeamPageHeaderLinks() {
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
    return {
      links: [
        {
          title: "Overview",
          href: getTeamDashboardLink(teamData.getTeam),
        },
        {
          title: "Members",
          href: getTeamMembersLink(teamData.getTeam),
        },
        {
          title: "Settings",
          href: getTeamSettingsLink(teamData.getTeam),
        },
      ],
      breadcrumbs: [
        {
          title: profileData.getUserProfile.name,
          href: `/dashboard`,
        },
        {
          title: teamData.getTeam.name,
          href: getTeamDashboardLink(teamData.getTeam),
        },
      ],
    };
  }

  return { links: [], breadcrumbs: [] };
}
