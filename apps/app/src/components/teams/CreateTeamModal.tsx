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

export const CreateTeamModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSave = () => {
    console.log("SAVE");
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
                <Input placeholder="Team Name" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>The unique team id</FormLabel>
                <Input placeholder="Team ID" />
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
