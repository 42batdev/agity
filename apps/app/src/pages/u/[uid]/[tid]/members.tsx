import React from "react";
import { AgityAppLayout } from "../../../../components/dashboard/AgityAppLayout";
import { PageSubHeader } from "ui";
import {
  initAppTeamProps,
  TeamServerSideProps,
} from "../../../../utils/ssr/serversideprops";
import { getPageHeaderLinks } from "./index";
import MemberCard from "../../../../components/team/MemberCard";
import { SimpleGrid } from "@chakra-ui/react";

const TeamDashboard = (props: TeamServerSideProps) => {
  return (
    <AgityAppLayout
      {...props}
      title={"TEAM XYZ Members"}
      links={getPageHeaderLinks(props)}
    >
      <PageSubHeader
        title="TEAM XYZ Members"
        subTitle={"The Teams you have access to"}
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <MemberCard name="John Doe" />
      </SimpleGrid>
    </AgityAppLayout>
  );
};

export const getServerSideProps = initAppTeamProps;

export default TeamDashboard;
