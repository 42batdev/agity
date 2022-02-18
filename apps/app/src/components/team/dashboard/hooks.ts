import {
  useGetTeamByTidQuery,
  useUserProfileQuery,
} from "../../../generated/graphql";
import { PageHeaderLink } from "../../layout";
import { useTid, useUid } from "./TeamNavigationContext";
export function useTeamPageHeaderLinks() {
  const uid = useUid();
  const tid = useTid();

  const { data: profileData } = useUserProfileQuery();
  const { data: teamData } = useGetTeamByTidQuery({ variables: { tid } });

  const links: Array<PageHeaderLink> = [
    { title: "Overview", href: `/u/${uid}/${tid}` },
    { title: "Members", href: `/u/${uid}/${tid}/members` },
  ];

  const breadcrumbs: Array<PageHeaderLink> = [
    { title: profileData?.getUserProfile?.name ?? "", href: `/dashboard` },
    { title: teamData?.getTeam?.name ?? "", href: `/u/${uid}/${tid}` },
  ];

  return { links, breadcrumbs };
}
