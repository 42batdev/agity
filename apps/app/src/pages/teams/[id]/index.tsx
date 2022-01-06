import { Container } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { AppLayout } from "../../../components/AppLayout";
import { AppHeader } from "../../../components/teams/layout/AppHeader";

export interface TeamPageProps {
  id: string;
}

const Dashboard = ({ id }: TeamPageProps) => {
  return (
    <AppLayout id={id}>
      <Head>
        <title>Agity | Team Dashboard</title>
      </Head>
      <AppHeader title="Settings" />
      <Container maxW={"7xl"} columns={{ base: 1, md: 2 }}>
        Nothing to see here
      </Container>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: { id } };
};

export default Dashboard;
