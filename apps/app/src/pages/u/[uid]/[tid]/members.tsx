import React from "react";
import { AgityAppLayout } from "../../../../components/dashboard/AgityAppLayout";
import { PageSubHeader } from "ui";
import {
  initAppTeamProps,
  TeamServerSideProps,
} from "../../../../utils/ssr/serversideprops";
import { getPageHeaderLinks } from "./index";
import { MemberList } from "../../../../components/team/MemberList";

const TeamDashboard = (props: TeamServerSideProps) => {
  return (
    <AgityAppLayout
      {...props}
      title={"TEAM XYZ Members"}
      links={getPageHeaderLinks(props)}
    >
      <PageSubHeader
        title="TEAM XYZ Members"
        subTitle={"The Teams you have access to"}
      />
      <MemberList tid={props.tid} />
    </AgityAppLayout>
  );
};

export const getServerSideProps = initAppTeamProps;

export default TeamDashboard;
