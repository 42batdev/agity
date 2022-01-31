import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useCreateTeam } from "supabase";
import { useState } from "react";

export const CreateTeamModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setName("");
      setTid("");
    },
  });

  const [name, setName] = useState("");
  const [tid, setTid] = useState("");

  const { mutate } = useCreateTeam();

  const onSave = () => {
    mutate({ tid, name });
    onClose();
  };

  return (
    <>
      <Button leftIcon={<FiPlus />} onClick={onOpen}>
        Create
      </Button>
      {isOpen && (
        <Modal isOpen onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a new Team</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>The name of your team</FormLabel>
                <Input
                  placeholder="Team Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>The unique team id</FormLabel>
                <Input
                  placeholder="Team ID"
                  value={tid}
                  onChange={(e) => setTid(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onSave}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
