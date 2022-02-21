import {
  PermissionLevel,
  Profile,
  TeamPermission,
} from "../../../generated/graphql";
import {
  Avatar,
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

export interface MemberCardProps {
  profile: Pick<Profile, "name" | "avatar">;
  permission: Pick<TeamPermission, "permissionLevel">;
}

export default function MemberCard({ profile, permission }: MemberCardProps) {
  const {
    isOpen: isHover,
    onOpen: onMouseEnter,
    onClose: onMouseLeave,
  } = useDisclosure();
  const { isOpen: isMenuOpen, onToggle: onToggleMenu } = useDisclosure();

  const demoteToMember = () => {};
  const promoteToAdmin = () => {};

  return (
    <Center py={6} position="relative">
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Image
          h="120px"
          w="full"
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
        />
        <Flex justify="center" mt="-12">
          <Avatar
            size="xl"
            src={profile.avatar?.url ?? undefined}
            onClick={onToggleMenu}
            icon={isHover ? <FiMenu /> : undefined}
            cursor="pointer"
            color="gray.100"
            border="2px solid white"
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {profile.name}
            </Heading>
            <Text color={"gray.500"}>{permission.permissionLevel}</Text>
          </Stack>
        </Box>
      </Box>
      {isMenuOpen && (
        <VStack
          position="absolute"
          w="100%"
          h="100%"
          bg="blackAlpha.800"
          justifyContent={"center"}
        >
          {permission.permissionLevel === PermissionLevel.MEMBER && (
            <Button variant={"solid"} onClick={promoteToAdmin}>
              Promote to Admin
            </Button>
          )}
          {permission.permissionLevel === PermissionLevel.ADMIN && (
            <Button variant={"solid"} onClick={demoteToMember}>
              Demote to Member
            </Button>
          )}

          <CloseButton onClick={onToggleMenu} />
        </VStack>
      )}
    </Center>
  );
}
