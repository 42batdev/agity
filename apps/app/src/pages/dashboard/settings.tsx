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
import { AgityAppLayout } from "../../components/dashboard/AgityAppLayout";
import {
  DashboardServerSideProps,
  initAppDashboardProps,
} from "../../utils/ssr/serversideprops";
import { dashboardLinks } from "./index";

const Settings = (props: DashboardServerSideProps) => {
  return (
    <AgityAppLayout {...props} title={"Agity Settings"} links={dashboardLinks}>
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

export const getServerSideProps = initAppDashboardProps;

export default Settings;
