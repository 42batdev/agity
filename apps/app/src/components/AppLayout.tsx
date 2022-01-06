import React, { ReactNode } from "react";
import { useTeam } from "supabase";
import { PageAppBar, PageContent, PageLayout } from "ui";
import { Button, HStack, Text, Tooltip } from "@chakra-ui/react";
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
      children: <ManageTeamLink name={`Team: ${data?.name}`} />,
    });
  }

  return (
    <PageLayout>
      <PageAppBar links={links} />
      <PageContent>{children}</PageContent>
    </PageLayout>
  );
};

interface ManageTeamLinkProps {
  name: string;
}

const ManageTeamLink = (props: ManageTeamLinkProps) => {
  const router = useRouter();
  return (
    <HStack>
      <Tooltip label="Manage Teams" hasArrow>
        <Button onClick={() => router.push("/teams")}>
          <CgArrowsExchange />
        </Button>
      </Tooltip>
      <Text>{props.name}</Text>
    </HStack>
  );
};
