import React from "react";
import { PageSubHeader } from "ui";
import { TeamManager } from "../../components/teams/TeamManager";
import { CreateTeamModal } from "../../components/teams/CreateTeamModal";
import {
  AgityAppLayout,
  AgityAppServerSideProps,
} from "../../components/teams/layout/AgityAppLayout";
import { initAppProps } from "../../utils/ssr/initAppProps";

const Dashboard = (props: AgityAppServerSideProps) => {
  return (
    <AgityAppLayout {...props} title={"Agity Dashboard"}>
      <PageSubHeader
        title="Your Teams"
        subTitle={"The Teams you have access to"}
        actions={<CreateTeamModal />}
      />
      <TeamManager />
    </AgityAppLayout>
  );
};

export const getServerSideProps = initAppProps;

export default Dashboard;
