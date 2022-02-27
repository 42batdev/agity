import { useAlertDialog } from "../../layout/PageContext";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const LeaveTeamButton = () => {
  const router = useRouter();
  const alert = useAlertDialog();

  return (
    <Tooltip label="Leave Team">
      <IconButton
        aria-label="leave-team-btn"
        icon={<FiLogOut />}
        onClick={() => {
          alert({
            title: "Leave the Team",
            onConfirm: () => {
              router.push("/");
            },
            onCancel: () => {},
          });
        }}
      />
    </Tooltip>
  );
};

export default LeaveTeamButton;
