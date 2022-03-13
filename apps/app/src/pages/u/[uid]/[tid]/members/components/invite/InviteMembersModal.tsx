import InviteMembersSelect from "./InviteMembersSelect";
import {
  Box,
  Button,
  Divider,
  Flex,
  FlexProps,
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";

export const InviteMembersModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {},
  });

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

              <InviteMembersSelect onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export const DividerWithText = (props: FlexProps) => {
  const { children, ...flexProps } = props;
  return (
    <Flex align="center" my={5} {...flexProps}>
      <Box flex="1">
        <Divider />
      </Box>
      <Text as="span" px="3" fontWeight="medium">
        {children}
      </Text>
      <Box flex="1">
        <Divider />
      </Box>
    </Flex>
  );
};
