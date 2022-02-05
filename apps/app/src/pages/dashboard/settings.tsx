import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { PageHeaderLink, PageSubHeader } from "ui";
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
import { SessionContextProvider, useProfile } from "supabase/SessionContext";

export const getServerSideProps = initAppDashboardProps;

export default function (props: DashboardServerSideProps) {
  return (
      <SessionContextProvider>
        <SettingsContent {...props} />
      </SessionContextProvider>
  );
}

const SettingsContent = (props: DashboardServerSideProps) => {
  const profile = useProfile();

  const dashboardLinks: Array<PageHeaderLink> = [
    {title: "Overview", href: `/dashboard`},
    {title: "Settings", href: `/dashboard/settings`},
  ];

  const breadcrumbs: Array<PageHeaderLink> = [
    {title: profile.name, href: `/dashboard`},
  ];

  return (
      <AgityAppLayout {...props} title={"Agity Settings"} links={dashboardLinks} breadcrumbs={breadcrumbs}>
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
                <DisplayNameSettingsSection/>
                <EmailSettingsSection/>
                <AvatarSettingsSection/>
              </SectionContainerGroup>
            </TabPanel>
            <TabPanel p="2">
              <SectionContainerGroup>
                <AccountUsernameSettingsSection/>
                <AccountIdSettingsSection/>
                <AccountDeleteSettingsSection/>
              </SectionContainerGroup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </AgityAppLayout>
  );
};
