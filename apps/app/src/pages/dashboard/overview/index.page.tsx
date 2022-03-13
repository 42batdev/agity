import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../components/layout/page";
import { getLoginLink } from "../../../functions/AgityRouter";
import { AuthContextProvider } from "../../../supabase/AuthContext";
import { useUserPageHeaderLinks } from "../useDashboardPageHeaderLinks";
import { CreateTeamModal } from "./components/CreateTeamModal";
import { TeamList } from "./components/TeamList";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import React from "react";

export const getServerSideProps = withAuthRequired({
  redirectTo: getLoginLink(),
});

export default function Dashboard(props: any) {
  return (
    <AuthContextProvider sessionUser={props.user}>
      <DashboardContent />
    </AuthContextProvider>
  );
}

const DashboardContent = () => {
  const { links, breadcrumbs } = useUserPageHeaderLinks();

  return (
    <Page>
      <PageHeader links={links} breadcrumbs={breadcrumbs} />
      <PageContent>
        <PageSubHeader
          title="Your Teams"
          subTitle={"The Teams you have access to"}
          actions={<CreateTeamModal />}
        />
        <TeamList />
      </PageContent>
    </Page>
  );
};
