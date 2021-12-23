import { Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { AppLayout } from "../../../components/AppLayout";

export interface TeamPageProps {
  id: string;
}

const Index = ({ id }: TeamPageProps) => {
  return (
    <AppLayout id={id}>
      <Head>
        <title>A G I T Y</title>
      </Head>
      <Text>Dashboard</Text>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    redirect: {
      destination: `${id}/dashboard`,
      permanent: false,
    },
    props: {},
  };
};

export default Index;
