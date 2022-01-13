import { Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { AppLayout } from "../../components/AppLayout";
import { TeamPageProps } from "./[id]";

const Meetings = ({ id }: TeamPageProps) => {
  return (
    <AppLayout id={id}>
      <Head>
        <title>A G I T Y</title>
      </Head>
      <Text>Meetings</Text>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: { id } };
};

export default Meetings;