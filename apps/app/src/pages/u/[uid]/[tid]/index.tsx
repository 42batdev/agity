import React from "react";
import { AgityAppLayout } from "../../../../components/dashboard/AgityAppLayout";
import { PageHeaderLink, PageSubHeader } from "ui";
import {
  initAppTeamProps,
  TeamServerSideProps,
} from "../../../../utils/ssr/serversideprops";
import {
  TeamContextProvider,
  useTeam,
} from "../../../../components/team/TeamContextProvider";
import { SessionContextProvider, useProfile } from "supabase/SessionContext";

export const getServerSideProps = initAppTeamProps;

export default function (props: TeamServerSideProps) {
  return (
    <SessionContextProvider>
      <TeamContextProvider tid={props.tid}>
        <TeamDashboardContent {...props} />
      </TeamContextProvider>
    </SessionContextProvider>
  );
}

const TeamDashboardContent = (props: TeamServerSideProps) => {
  const team = useTeam();
  const profile = useProfile();

  const teamLinks: Array<PageHeaderLink> = [
    { title: "Overview", href: `/u/${props.uid}/${props.tid}` },
    { title: "Members", href: `/u/${props.uid}/${props.tid}/members` },
  ];

  const breadcrumbs: Array<PageHeaderLink> = [
    { title: profile.name, href: `/dashboard` },
    { title: team.name, href: `/u/${props.uid}/${props.tid}` },
  ];

  return (
    <AgityAppLayout
      title={team.name}
      links={teamLinks}
      breadcrumbs={breadcrumbs}
    >
      <PageSubHeader
        title={`Team Dashboard`}
        subTitle={"The Teams you have access to"}
      />
      This is a team Dashboard for {team.name}
    </AgityAppLayout>
  );
};
