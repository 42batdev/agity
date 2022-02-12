import React from "react";
import {useUserProfileQuery} from "../../generated/graphql";
import {useUser} from "../../supabase/AuthContext";

export default function () {
  return (
      <DashboardContent />
  );
}

const DashboardContent = () => {
  const user = useUser()
  const {loading, data, error} = useUserProfileQuery({variables: {id: user?.id}})

  return <div>{data?.getUserProfile.id}</div>
};
