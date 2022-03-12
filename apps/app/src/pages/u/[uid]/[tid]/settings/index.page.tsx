import { SectionContainerGroup } from "../../../../../components/SectionContainer";
import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../../../components/layout/page";
import { getLoginLink } from "../../../../../functions/AgityRouter";
import { AuthContextProvider } from "../../../../../supabase/AuthContext";
import { initTeamProps, TeamServerSideProps } from "../../../../ssrprops";
import { TeamNavigationContextProvider } from "../TeamNavigationContext";
import { useTeamPageHeaderLinks } from "../useTeamPageHeaderLinks";
import {
  TeamDeleteSettingsSection,
  TeamIdSettingsSection,
  TeamNameSettingsSection,
} from "./components/GeneralTeamSettingsSections";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { mergeProps } from "next-merge-props";
import React from "react";

export const getServerSideProps = withAuthRequired({
  redirectTo: getLoginLink(),
  getServerSideProps: mergeProps<TeamServerSideProps>(initTeamProps),
});

export default function TeamMembers(props) {
  return (
    <AuthContextProvider sessionUser={props.user}>
      <TeamNavigationContextProvider {...props}>
        <SettingsContent />
      </TeamNavigationContextProvider>
    </AuthContextProvider>
  );
}

const SettingsContent = () => {
  const { links, breadcrumbs } = useTeamPageHeaderLinks();

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
            <Tab justifyContent={"flex-start"}>General</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="2">
              <SectionContainerGroup>
                <TeamNameSettingsSection />
                <TeamIdSettingsSection />
                <TeamDeleteSettingsSection />
              </SectionContainerGroup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageContent>
    </Page>
  );
};
