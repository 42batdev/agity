import Head from "next/head";
import React from "react";
import { AppLayout } from "../../components/AppLayout";
import { TeamManager } from "../../components/teams/TeamManager";

const Welcome = () => {
  return (
    <AppLayout>
      <Head>
        <title>Your Agity Teams</title>
      </Head>
      <TeamManager />
    </AppLayout>
  );
};

export default Welcome;
