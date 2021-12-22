import { Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { AppLayout } from "../components/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <Head>
        <title>A G I T Y</title>
      </Head>
      <Text>Onboarding</Text>
    </AppLayout>
  );
};

export default Index;
