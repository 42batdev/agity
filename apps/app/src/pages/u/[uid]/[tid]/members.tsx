import React from "react";
import { AgityAppLayout } from "../../../../components/dashboard/AgityAppLayout";
import { PageSubHeader } from "ui";
import {
  initAppTeamProps,
  TeamServerSideProps,
} from "../../../../utils/ssr/serversideprops";
import { getPageHeaderLinks } from "./index";
import { MemberList } from "../../../../components/team/MemberList";
import { TeamContextProvider } from "../../../../components/team/TeamContextProvider";

const TeamDashboard = (props: TeamServerSideProps) => {
  return (
    <TeamContextProvider tid={props.tid}>
      <AgityAppLayout
        {...props}
        title={"TEAM XYZ Members"}
        links={getPageHeaderLinks(props)}
      >
        <PageSubHeader
          title="TEAM XYZ Members"
          subTitle={"The Teams you have access to"}
        />
        <MemberList />
      </AgityAppLayout>
    </TeamContextProvider>
  );
};

export const getServerSideProps = initAppTeamProps;

export default TeamDashboard;
