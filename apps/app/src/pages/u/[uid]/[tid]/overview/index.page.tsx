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
import { CreateMeetingModal } from "./components/CreateMeetingModal";
import { MeetingList } from "./components/MeetingList";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { mergeProps } from "next-merge-props";
import React from "react";

export const getServerSideProps = withAuthRequired({
  redirectTo: getLoginLink(),
  getServerSideProps: mergeProps<TeamServerSideProps>(initTeamProps),
});

export default function TeamDashboard(props) {
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
        <MeetingList />
      </PageContent>
    </Page>
  );
};
