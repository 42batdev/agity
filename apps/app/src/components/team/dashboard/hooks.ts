import { useUserProfileQuery } from "../../../generated/graphql";
import { PageHeaderLink } from "../../common/layout/page";
import { useTeam } from "../hooks/useTeam";

export function useTeamPageHeaderLinks() {
  const { data: profileData } = useUserProfileQuery();
  const { data: teamData } = useTeam();

  const links: Array<PageHeaderLink> = [
    {
      title: "Overview",
      href: `/u/${profileData?.getUserProfile?.uid}/${teamData?.getTeam?.tid}`,
    },
    {
      title: "Members",
      href: `/u/${profileData?.getUserProfile?.uid}/${teamData?.getTeam?.tid}/members`,
    },
  ];

  const breadcrumbs: Array<PageHeaderLink> = [
    { title: profileData?.getUserProfile?.name ?? "", href: `/dashboard` },
    {
      title: teamData?.getTeam?.name ?? "",
      href: `/u/${profileData?.getUserProfile?.uid}/${teamData?.getTeam?.tid}`,
    },
  ];

  return { links, breadcrumbs };
}
