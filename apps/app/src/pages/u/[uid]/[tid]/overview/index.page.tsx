import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../../../components/layout/page";
import {
  AppServerSideProps,
  initSupabaseProps,
  initTeamProps,
  TeamServerSideProps,
} from "../../../../../server/ssr/props";
import { AuthContextProvider } from "../../../../../supabase/AuthContext";
import { TeamNavigationContextProvider } from "../TeamNavigationContext";
import { useTeamPageHeaderLinks } from "../useTeamPageHeaderLinks";
import { CreateMeetingModal } from "./components/CreateMeetingModal";
import { mergeProps } from "next-merge-props";
import React from "react";

export const getServerSideProps = mergeProps<
  AppServerSideProps & TeamServerSideProps
>(initSupabaseProps, initTeamProps);

export default function TeamDashboard(
  props: AppServerSideProps & TeamServerSideProps
) {
  return (
    <AuthContextProvider sessionUser={props.user}>
      <TeamNavigationContextProvider {...props}>
        <TeamDashboardContent />
      </TeamNavigationContextProvider>
    </AuthContextProvider>
  );
}

const TeamDashboardContent = () => {
  const { links, breadcrumbs } = useTeamPageHeaderLinks();

  return (
    <Page>
      <PageHeader links={links} breadcrumbs={breadcrumbs} />
      <PageContent>
        <PageSubHeader
          title={`Team Dashboard`}
          subTitle={"Team activity and history"}
          actions={<CreateMeetingModal />}
        />
        This is a team Dashboard!
      </PageContent>
    </Page>
  );
};
