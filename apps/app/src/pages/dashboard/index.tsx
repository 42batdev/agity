import React from "react";
import { useUserProfileQuery } from "../../generated/graphql";
import { initAppProps } from "../../server/ssr/props";
import { useUser } from "../../supabase/AuthContext";

export const getServerSideProps = initAppProps;

export default function Dashboard() {
  return <DashboardContent />;
}

const DashboardContent = () => {
  const user = useUser();
  const { loading, data, error } = useUserProfileQuery({
    variables: { id: user?.id },
  });

  return <div>{data?.getUserProfile.id}</div>;
};
