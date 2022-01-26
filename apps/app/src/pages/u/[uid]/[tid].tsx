import React from "react";
import { AgityAppLayout } from "../../../components/dashboard/AgityAppLayout";
import { PageHeaderLink, PageSubHeader } from "ui";
import {
  initAppTeamProps,
  TeamServerSideProps,
} from "../../../utils/ssr/serversideprops";

const TeamDashboard = (props: TeamServerSideProps) => {
  const teamLinks: Array<PageHeaderLink> = [
    { title: "Overview", href: `/u/${props.uid}/${props.tid}` },
  ];

  return (
    <AgityAppLayout {...props} title={"TEAM XYZ Dashboard"} links={teamLinks}>
      <PageSubHeader
        title="TEAM XYZ Dashboard"
        subTitle={"The Teams you have access to"}
      />
      This is a team page for {props.tid} from {props.uid}
    </AgityAppLayout>
  );
};

export const getServerSideProps = initAppTeamProps;

export default TeamDashboard;
