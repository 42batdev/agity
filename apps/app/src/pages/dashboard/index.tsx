import React from "react";
import { PageSubHeader } from "ui";
import { TeamManager } from "../../components/teams/TeamManager";
import { CreateTeamModal } from "../../components/teams/CreateTeamModal";
import { GetServerSideProps } from "next/types";
import {
  AgityAppLayout,
  AgityAppServerSideProps,
  withProfile,
} from "../../components/teams/layout/AgityAppLayout";

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

export const getServerSideProps: GetServerSideProps = withProfile();

export default Dashboard;
