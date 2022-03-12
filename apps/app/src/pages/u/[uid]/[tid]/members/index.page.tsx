import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../../../components/layout/page";
import { getLoginLink } from "../../../../../functions/AgityRouter";
import {
  initTeamProps,
  TeamServerSideProps,
} from "../../../../../server/ssr/props";
import { AuthContextProvider } from "../../../../../supabase/AuthContext";
import { TeamNavigationContextProvider } from "../TeamNavigationContext";
import { useTeamPageHeaderLinks } from "../useTeamPageHeaderLinks";
import LeaveTeamButton from "./components/LeaveTeamButton";
import { MemberList } from "./components/MemberList";
import { InviteMembersModal } from "./components/invite/InviteMembersModal";
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
        <TeamMembersContent />
      </TeamNavigationContextProvider>
    </AuthContextProvider>
  );
}

const TeamMembersContent = () => {
  const { links, breadcrumbs } = useTeamPageHeaderLinks();

  return (
    <Page>
      <PageHeader links={links} breadcrumbs={breadcrumbs} />
      <PageContent>
        <PageSubHeader
          title={`Team Members`}
          subTitle={"View and manage the team members"}
          actions={
            <>
              <InviteMembersModal />
              <LeaveTeamButton />
            </>
          }
        />
        <MemberList />
      </PageContent>
    </Page>
  );
};
