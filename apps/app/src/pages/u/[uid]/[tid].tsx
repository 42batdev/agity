import React from "react";
import { AgityAppLayout } from "../../../components/dashboard/AgityAppLayout";
import { PageSubHeader } from "ui";
import {
  initAppTeamProps,
  TeamServerSideProps,
} from "../../../utils/ssr/serversideprops";

const TeamDashboard = (props: TeamServerSideProps) => {
  return (
    <AgityAppLayout {...props} title={"TEAM XYZ Dashboard"}>
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
