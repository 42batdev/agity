import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {mergeProps} from "next-merge-props";
import React from "react";
import {Page, PageContent, PageHeader, PageSubHeader,} from "../../../../../components/common/layout/page";
import {SectionContainerGroup} from "../../../../../components/common/SectionContainer";
import {
  TeamDeleteSettingsSection,
  TeamIdSettingsSection,
  TeamNameSettingsSection,
} from "../../../../../components/team/settings/GeneralTeamSettingsSections";
import {TeamNavigationContextProvider} from "../../../../../components/team/TeamNavigationContext";
import {useTeamPageHeaderLinks} from "../../../../../components/team/useTeamPageHeaderLinks";
import {
  AppServerSideProps,
  initSupabaseProps,
  initTeamProps,
  TeamServerSideProps,
} from "../../../../../server/ssr/props";
import {AuthContextProvider} from "../../../../../supabase/AuthContext";

export const getServerSideProps = mergeProps<
  AppServerSideProps & TeamServerSideProps
>(initSupabaseProps, initTeamProps);

export default function TeamMembers(
  props: AppServerSideProps & TeamServerSideProps
) {
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
