import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../../components/common/layout/page";
import { TeamNavigationContextProvider } from "../../../../components/team/TeamNavigationContext";
import { useTeamPageHeaderLinks } from "../../../../components/team/useTeamPageHeaderLinks";
import {
  AppServerSideProps,
  initSupabaseProps,
  initTeamProps,
  TeamServerSideProps,
} from "../../../../server/ssr/props";
import { AuthContextProvider } from "../../../../supabase/AuthContext";
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
          subTitle={"The Teams you have access to"}
        />
        This is a team Dashboard!
      </PageContent>
    </Page>
  );
};
