import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Page, PageContent, PageHeader, PageSubHeader } from "ui";

const Settings = () => {
  return (
    <Page>
      <Head>
        <title>Agity Settings</title>
      </Head>
      <PageHeader
        links={[
          { title: "Overview", href: "/dashboard" },
          { title: "Activity", href: "/dashboard/activity" },
          { title: "Settings", href: "/dashboard/settings" },
        ]}
      />
      <PageContent>
        <PageSubHeader
          title="Profile & Settings"
          subTitle={"Your personal account"}
        />

        <Tabs orientation="vertical">
          <TabList w="30%">
            <Tab justifyContent={"flex-start"}>Profile</Tab>
            <Tab justifyContent={"flex-start"}>Account</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="2">Content 1</TabPanel>
            <TabPanel p="2">Content 2</TabPanel>
          </TabPanels>
        </Tabs>
      </PageContent>
    </Page>
  );
};

export default Settings;
