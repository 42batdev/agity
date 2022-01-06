import React, { ReactNode } from "react";
import { useTeam } from "supabase";
import { PageAppBar, PageContent, PageLayout } from "ui";
import { Button, Tooltip } from "@chakra-ui/react";
import { CgArrowsExchange } from "react-icons/cg";
import { useRouter } from "next/router";

export interface AppLayoutProps {
  id?: string;
  children: ReactNode;
}

export const AppLayout = ({ id, children }: AppLayoutProps) => {
  const { data, isLoading } = useTeam(id);

  let links = [];
  if (!id) {
    links.push({
      id: "manage-teams",
      children: <ManageTeamLink name="No Team selected" />,
    });
  } else if (!isLoading) {
    links.push({
      id: "manage-teams",
      children: <ManageTeamLink name={data?.name} />,
    });
    links.push({
      id: "manage-teams",
      children: <TeamLink name="Dashboard" sub={`/teams/${id}/`} />,
    });
    links.push({
      id: "manage-teams",
      children: <TeamLink name="Settings" sub={`/teams/${id}/settings`} />,
    });
  }

  return (
    <PageLayout>
      <PageAppBar links={links} />
      <PageContent>{children}</PageContent>
    </PageLayout>
  );
};

const ManageTeamLink = (props: { name: string }) => {
  const router = useRouter();
  return (
    <Tooltip label="Manage Teams" hasArrow>
      <Button
        variant="ghost"
        leftIcon={<CgArrowsExchange />}
        onClick={() => router.push("/teams")}
      >
        {props.name}
      </Button>
    </Tooltip>
  );
};

const TeamLink = (props: { name: string; sub: string }) => {
  const router = useRouter();
  return (
    <Button variant="ghost" onClick={() => router.push(props.sub)}>
      {props.name}
    </Button>
  );
};
