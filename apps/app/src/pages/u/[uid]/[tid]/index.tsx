import React from "react";
import { AgityAppLayout } from "../../../../components/dashboard/AgityAppLayout";
import { PageHeaderLink, PageSubHeader } from "ui";
import {
  initAppTeamProps,
  TeamServerSideProps,
} from "../../../../utils/ssr/serversideprops";
import { TeamContextProvider } from "../../../../components/team/TeamContextProvider";

const TeamDashboard = (props: TeamServerSideProps) => {
  const teamLinks = getPageHeaderLinks(props);

  return (
    <TeamContextProvider tid={props.tid}>
      <AgityAppLayout {...props} title={"TEAM XYZ Dashboard"} links={teamLinks}>
        <PageSubHeader
          title="TEAM XYZ Dashboard"
          subTitle={"The Teams you have access to"}
        />
        This is a team page for {props.tid} from {props.uid}
      </AgityAppLayout>
    </TeamContextProvider>
  );
};

export function getPageHeaderLinks(props: TeamServerSideProps) {
  const teamLinks: Array<PageHeaderLink> = [
    { title: "Overview", href: `/u/${props.uid}/${props.tid}` },
    { title: "Members", href: `/u/${props.uid}/${props.tid}/members` },
  ];
  return teamLinks;
}

export const getServerSideProps = initAppTeamProps;

export default TeamDashboard;
