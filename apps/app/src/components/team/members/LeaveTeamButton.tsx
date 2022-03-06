import { canLeaveTeam } from "../../../functions/permissions";
import { useRemoveFromTeamMutation } from "../../../generated/graphql";
import { useUser } from "../../../supabase/AuthContext";
import { useAlertDialog } from "../../common/layout/page/PageContext";
import { useTeam } from "../useTeam";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const LeaveTeamButton = () => {
  const router = useRouter();
  const alert = useAlertDialog();

  const { data: teamData, loading: teamLoading } = useTeam();
  const user = useUser();

  const [removeFromTeamMutation] = useRemoveFromTeamMutation();

  const visible =
    !teamLoading && teamData && canLeaveTeam(teamData?.getTeam?.myPermissions);

  return (
    <>
      {visible && (
        <Tooltip label="Leave Team">
          <IconButton
            aria-label="leave-team-btn"
            icon={<FiLogOut />}
            onClick={() => {
              alert({
                title: "Leave the Team",
                onConfirm: () => {
                  if (teamData?.getTeam) {
                    removeFromTeamMutation({
                      variables: {
                        input: {
                          teamId: teamData?.getTeam?.id,
                          profileId: user.id,
                        },
                      },
                    });
                  }
                  router.push("/");
                },
                onCancel: () => {},
              });
            }}
          />
        </Tooltip>
      )}
    </>
  );
};

export default LeaveTeamButton;
