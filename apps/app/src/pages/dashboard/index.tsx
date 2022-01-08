import Head from "next/head";
import React from "react";
import { AppLayout } from "../../components/AppLayout";
import { AppHeader } from "../../components/teams/layout/AppHeader";
import { CreateTeamModal } from "../../components/teams/CreateTeamModal";
import { Container } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <AppLayout>
      <Head>
        <title>Your Agity Teams</title>
      </Head>
      <AppHeader title="Your Teams" actions={<CreateTeamModal />} />
      <Container maxW={"7xl"} columns={{ base: 1, md: 2 }}>
        CONTENT
      </Container>
    </AppLayout>
  );
};

export default Dashboard;
