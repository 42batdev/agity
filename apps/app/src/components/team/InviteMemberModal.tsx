import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import supabase from "supabase";
import React, { useState } from "react";
import { DividerWithText } from "../login/OAuth";
import { AsyncSelect, MultiValue } from "chakra-react-select";

export const InviteMemberModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {},
  });

  const [selectedUserIds, setSelectedUserIds] =
    useState<MultiValue<string>>(undefined);

  const onSave = () => {
    console.log(selectedUserIds);
    onClose();
  };

  return (
    <>
      <Button leftIcon={<FiPlus />} onClick={onOpen}>
        Invite
      </Button>
      {isOpen && (
        <Modal isOpen onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Invite members to team</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Share Invite Link</FormLabel>
                <InputGroup size="md">
                  <Input pr="4.5rem" value={"http://www.agity.com"} readOnly />
                  <InputRightElement width="6rem">
                    <Button h="1.75rem" size="sm" onClick={console.log}>
                      Copy Link
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <DividerWithText>or</DividerWithText>

              <VStack alignItems="stretch">
                <AsyncSelect
                  isMulti
                  placeholder="Search users..."
                  onChange={setSelectedUserIds}
                  loadOptions={(inputValue) =>
                    supabase
                      .from("profiles")
                      .select("id, uid, name")
                      .ilike("name", `%${inputValue}%`)
                      .then((query) => {
                        const options = [];
                        if (query.data) {
                          query.data.forEach((res) =>
                            options.push({
                              value: res.id,
                              label: res.name,
                            })
                          );
                        }
                        return options;
                      })
                  }
                />
                <Button isFullWidth onClick={onSave}>
                  Confirm
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
