import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../../../components/layout/page";
import { getLoginLink } from "../../../../../functions/AgityRouter";
import {
  initMeetingProps,
  initTeamProps,
  MeetingServerSideProps,
  TeamServerSideProps,
} from "../../../../../server/ssr/props";
import { AuthContextProvider } from "../../../../../supabase/AuthContext";
import { TeamNavigationContextProvider } from "../TeamNavigationContext";
import { useTeamPageHeaderLinks } from "../useTeamPageHeaderLinks";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { mergeProps } from "next-merge-props";
import React from "react";

export const getServerSideProps = withAuthRequired({
  redirectTo: getLoginLink(),
  getServerSideProps: mergeProps<TeamServerSideProps & MeetingServerSideProps>(
    initTeamProps,
    initMeetingProps
  ),
});
export default function TeamMeeting(props) {
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
        <PageSubHeader
          title={`Meeting`}
          subTitle={
            "A new meeting! If you leave you will never get back here :D"
          }
        />
        This is a new meeting!
      </PageContent>
    </Page>
  );
};
