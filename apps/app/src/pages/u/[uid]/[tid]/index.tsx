import { CreateTeamModal } from "../../../../components/dashboard/teams/CreateTeamModal";
import { TeamManager } from "../../../../components/dashboard/teams/TeamManager";
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderLink,
  PageSubHeader,
} from "../../../../components/layout";
import {
  TeamNavigationContextProvider,
  useTid,
  useUid,
} from "../../../../components/team/dashboard/TeamNavigationContext";
import { useTeamPageHeaderLinks } from "../../../../components/team/dashboard/hooks";
import { useUserProfileQuery } from "../../../../generated/graphql";
import {
  AppServerSideProps,
  initAppProps,
  initUProps,
  TeamServerSideProps,
} from "../../../../server/ssr/props";
import { AuthContextProvider } from "../../../../supabase/AuthContext";
import { mergeProps } from "next-merge-props";
import { AppInitialProps } from "next/dist/pages/_app";
import React from "react";

export const getServerSideProps = mergeProps<
  AppServerSideProps & TeamServerSideProps
>(initAppProps, initUProps);

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
