import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import {
  AccountDeleteSettingsSection,
  AccountIdSettingsSection,
  AccountUsernameSettingsSection,
} from "../../components/dashboard/settings/AccountSettingsSections";
import {
  AvatarSettingsSection,
  DisplayNameSettingsSection,
  EmailSettingsSection,
} from "../../components/dashboard/settings/ProfileSettingsSections";
import { SectionContainerGroup } from "../../components/dashboard/settings/SectionContainer";
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderLink,
  PageSubHeader,
} from "../../components/layout";

import { initAppProps } from "../../server/ssr/props";
import { useActiveUserProfileQuery } from "../../utils/hooks/profile";

export const getServerSideProps = initAppProps;

export default function Settings() {
  return <SettingsContent />;
}

const SettingsContent = () => {
  const { data } = useActiveUserProfileQuery();

  const links: Array<PageHeaderLink> = [
    { title: "Overview", href: `/dashboard` },
    { title: "Settings", href: `/dashboard/settings` },
  ];

  const breadcrumbs: Array<PageHeaderLink> = data
    ? [{ title: data?.getUserProfile.name, href: `/dashboard` }]
    : [];

  return (
    <Page>
      <PageHeader links={links} breadcrumbs={breadcrumbs} />
      <PageContent>
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
      </PageContent>
    </Page>
  );
};
