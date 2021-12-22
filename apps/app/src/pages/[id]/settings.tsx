import { Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { AppLayout } from "../../components/AppLayout";
import { TeamPageProps } from "./index";

const Settings = ({ id }: TeamPageProps) => {
  return (
    <AppLayout id={id}>
      <Head>
        <title>A G I T Y</title>
      </Head>
      <Text>Settings</Text>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: { id } };
};

export default Settings;
