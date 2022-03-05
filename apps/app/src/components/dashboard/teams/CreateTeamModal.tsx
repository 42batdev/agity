import {
  GetUserTeamsDocument,
  useCreateTeamMutation,
} from "../../../generated/graphql";
import { validIDPattern } from "../../../server/graphql/errors";
import { checkTidExists } from "../../../supabase/utils";
import ValidatedInput from "../../common/ValidateInput";
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
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

export const CreateTeamModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setName("");
      setTid("");
    },
  });

  const [name, setName] = useState("");
  const [tid, setTid] = useState("");
  const [tidValid, setTidValid] = useState(true);

  const [createTeamMutation] = useCreateTeamMutation();

  const onSave = () => {
    createTeamMutation({
      variables: { input: { tid, name } },
      refetchQueries: [GetUserTeamsDocument],
    });
    onClose();
  };

  return (
    <>
      <Button leftIcon={<FiPlus />} onClick={onOpen}>
        Create
      </Button>
      {isOpen && (
        <Modal isOpen onClose={onClose} size="xl">
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
                <FormLabel>The ID of your team</FormLabel>
                <ValidatedInput
                  onChange={(value) => setTid(value)}
                  onValidate={(value) => {
                    return checkTidExists(value).then((exists) => {
                      const valid = validIDPattern.test(value);
                      setTidValid(valid && !exists);
                      return !valid || exists;
                    });
                  }}
                  helpLabel="Agity uses your team ID to identify our team. It must be unique."
                  inputProps={{
                    type: "text",
                    placeholder: "Team ID",
                    value: tid,
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                onClick={onSave}
                isDisabled={!tidValid || tid.length === 0 || name.length === 0}
              >
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
