import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../../components/layout";
import { TeamNavigationContextProvider } from "../../../../components/team/dashboard/TeamNavigationContext";
import { useTeamPageHeaderLinks } from "../../../../components/team/dashboard/hooks";
import LeaveTeamButton from "../../../../components/team/members/LeaveTeamButton";
import { MemberList } from "../../../../components/team/members/MemberList";
import { InviteMembersModal } from "../../../../components/team/members/invite/InviteMembersModal";
import {
  AppServerSideProps,
  initAppProps,
  initUProps,
  TeamServerSideProps,
} from "../../../../server/ssr/props";
import { AuthContextProvider } from "../../../../supabase/AuthContext";
import { mergeProps } from "next-merge-props";
import React from "react";

export const getServerSideProps = mergeProps<
  AppServerSideProps & TeamServerSideProps
>(initAppProps, initUProps);

export default function TeamMembers(
  props: AppServerSideProps & TeamServerSideProps
) {
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
