import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { PageSubHeader } from "ui";
import { SectionContainerGroup } from "../../components/dashboard/settings/SectionContainer";
import {
  AvatarSettingsSection,
  DisplayNameSettingsSection,
  EmailSettingsSection,
} from "../../components/dashboard/settings/ProfileSettingsSections";
import {
  AccountDeleteSettingsSection,
  AccountIdSettingsSection,
  AccountUsernameSettingsSection,
} from "../../components/dashboard/settings/AccountSettingsSections";
import { GetServerSideProps } from "next/types";
import {
  AgityAppLayout,
  AgityAppServerSideProps,
  withProfile,
} from "../../components/teams/layout/AgityAppLayout";

const Settings = (props: AgityAppServerSideProps) => {
  return (
    <AgityAppLayout {...props} title={"Agity Dashboard"}>
      <PageSubHeader
        title="Profile & Settings"
        subTitle={"Your personal account"}
      />

      <Tabs orientation="vertical" id="settings-tabs" isLazy>
        <TabList w="30%">
          <Tab justifyContent={"flex-start"}>Profile</Tab>
          <Tab justifyContent={"flex-start"}>Account</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="2">
            <SectionContainerGroup>
              <DisplayNameSettingsSection />
              <EmailSettingsSection />
              <AvatarSettingsSection />
            </SectionContainerGroup>
          </TabPanel>
          <TabPanel p="2">
            <SectionContainerGroup>
              <AccountUsernameSettingsSection />
              <AccountIdSettingsSection />
              <AccountDeleteSettingsSection />
            </SectionContainerGroup>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AgityAppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withProfile();

export default Settings;
