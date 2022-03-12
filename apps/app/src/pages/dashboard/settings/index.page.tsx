import { SectionContainerGroup } from "../../../components/SectionContainer";
import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../components/layout/page";
import { getLoginLink } from "../../../functions/AgityRouter";
import { AuthContextProvider } from "../../../supabase/AuthContext";
import { useUserPageHeaderLinks } from "../useDashboardPageHeaderLinks";
import {
  AccountDeleteSettingsSection,
  AccountIdSettingsSection,
  AccountUsernameSettingsSection,
} from "./components/AccountSettingsSections";
import {
  AvatarSettingsSection,
  DisplayNameSettingsSection,
  EmailSettingsSection,
} from "./components/ProfileSettingsSections";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import React from "react";

export const getServerSideProps = withAuthRequired({
  redirectTo: getLoginLink(),
});

export default function Settings(props) {
  return (
    <AuthContextProvider sessionUser={props.user}>
      <SettingsContent />
    </AuthContextProvider>
  );
}

const SettingsContent = () => {
  const { links, breadcrumbs } = useUserPageHeaderLinks();

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
