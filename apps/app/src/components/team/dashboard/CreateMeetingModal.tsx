import { useAgityRouter } from "../../../functions/links";
import { useCreateMeetingMutation } from "../../../generated/graphql";
import { useTeam } from "../useTeam";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

export const CreateMeetingModal = () => {
  const router = useAgityRouter();

  const { loading, data: teamData } = useTeam();
  const [mutate] = useCreateMeetingMutation();

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setName("");
    },
  });
  const [name, setName] = useState("");

  return (
    <>
      <Button leftIcon={<FiPlus />} onClick={onOpen}>
        Estimate
      </Button>
      {isOpen && (
        <Modal isOpen onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Start a new estimate meeting</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack>
                <Input
                  placeholder="Meeting Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  variant={"solid"}
                  disabled={loading}
                  onClick={() => {
                    if (teamData?.getTeam) {
                      mutate({
                        variables: {
                          input: { name, teamId: teamData?.getTeam.id },
                        },
                      }).then(({ data }) => {
                        if (teamData?.getTeam && data?.createMeeting) {
                          router.openTeamMeeting(
                            teamData.getTeam,
                            data?.createMeeting
                          );
                        }
                      });
                    }
                    onClose();
                  }}
                  isFullWidth
                >
                  Start Meeting
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
