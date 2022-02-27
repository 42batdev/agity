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
import { SectionContainerGroup } from "../../components/common/SectionContainer";
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderLink,
  PageSubHeader,
} from "../../components/common/layout/page";
import { useUserProfileQuery } from "../../generated/graphql";
import { AppServerSideProps, initAppProps } from "../../server/ssr/props";
import { AuthContextProvider } from "../../supabase/AuthContext";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

export const getServerSideProps = initAppProps;

export default function Settings({ user }: AppServerSideProps) {
  return (
    <AuthContextProvider sessionUser={user}>
      <SettingsContent />
    </AuthContextProvider>
  );
}

const SettingsContent = () => {
  const { data } = useUserProfileQuery();

  const links: Array<PageHeaderLink> = [
    { title: "Overview", href: `/dashboard` },
    { title: "Settings", href: `/dashboard/settings` },
  ];

  const breadcrumbs: Array<PageHeaderLink> =
    data && data.getUserProfile
      ? [{ title: data.getUserProfile.name, href: `/dashboard` }]
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
