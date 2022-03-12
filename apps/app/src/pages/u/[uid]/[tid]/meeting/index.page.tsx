import {mergeProps} from "next-merge-props";
import React from "react";
import {Page, PageContent, PageHeader, PageSubHeader,} from "../../../../../components/common/layout/page";
import {TeamNavigationContextProvider} from "../../../../../components/team/TeamNavigationContext";
import {useTeamPageHeaderLinks} from "../../../../../components/team/useTeamPageHeaderLinks";
import {
  AppServerSideProps,
  initMeetingProps,
  initSupabaseProps,
  initTeamProps,
  MeetingServerSideProps,
  TeamServerSideProps,
} from "../../../../../server/ssr/props";
import {AuthContextProvider} from "../../../../../supabase/AuthContext";

export const getServerSideProps = mergeProps<
  AppServerSideProps & TeamServerSideProps
>(initSupabaseProps, initTeamProps, initMeetingProps);

export default function TeamMeeting(
  props: AppServerSideProps & TeamServerSideProps & MeetingServerSideProps
) {
  return (
    <AuthContextProvider sessionUser={props.user}>
      <TeamNavigationContextProvider {...props}>
        <TeamEstimateContent />
      </TeamNavigationContextProvider>
    </AuthContextProvider>
  );
}

const TeamEstimateContent = () => {
  const { links, breadcrumbs } = useTeamPageHeaderLinks();

  return (
    <Page>
      <PageHeader links={links} breadcrumbs={breadcrumbs} />
      <PageContent>
        <PageSubHeader title={`Meeting`} subTitle={"A new meeting! If you leave you will never get back here :D"} />
        This is a new meeting!
      </PageContent>
    </Page>
  );
};
