import React from "react";
import { CreateTeamModal } from "../../../components/dashboard/CreateTeamModal";
import {
  AgityAppServerSideProps,
  initAppDashboardProps,
} from "../../../components/dashboard/initAppDashboardProps";
import { AgityAppLayout } from "../../../components/dashboard/AgityAppLayout";
import { PageSubHeader } from "ui";

const Dashboard = (props: AgityAppServerSideProps) => {
  return (
    <AgityAppLayout {...props} title={"Agity Dashboard"}>
      <PageSubHeader
        title="Your Teams"
        subTitle={"The Teams you have access to"}
        actions={<CreateTeamModal />}
      />
      This is a team page
    </AgityAppLayout>
  );
};

export const getServerSideProps = initAppDashboardProps;

export default Dashboard;
