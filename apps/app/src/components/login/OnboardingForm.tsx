import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SkeletonCircle,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiHelpCircle,
  FiSearch,
  FiXCircle,
} from "react-icons/fi";
import debounce from "lodash/debounce";
import { useCreateUserProfileMutation } from "../../generated/graphql";
import supabase from "../../supabase";
import { checkUidExists } from "../../supabase/pql/profiles";

enum UsernameCheckState {
  LOADING,
  VALID,
  ERROR,
}

export const OnboardingForm = () => {
  const router = useRouter();
  const [mutate] = useCreateUserProfileMutation();

  const [uid, setUid] = useState<string>("");
  const [uidCheck, setUidCheck] = useState<UsernameCheckState>();
  const debouncedUsernameCheck = useRef(
    debounce((newUid: string) => {
      checkUidExists(newUid).then((exists) => {
        if (exists) {
          // setUidCheck(UsernameCheckState.ERROR);
        } else {
          // setUidCheck(UsernameCheckState.VALID);
        }
      });
    }, 500)
  );

  const [name, setName] = useState<string>("");

  const handleUsernameChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newUid = event.currentTarget.value;
    debouncedUsernameCheck.current.cancel();
    if (newUid && newUid.length > 0) {
      setUid(newUid);
      setUidCheck(UsernameCheckState.LOADING);

      debouncedUsernameCheck.current(newUid);
    } else {
      setUidCheck(undefined);
    }
  };

  const handleLogin = async () => {
    mutate({ variables: { input: { uid, name } } }).then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <Stack spacing={4}>
        <Heading
          color={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        >
          Create a profile
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          This is a one-time requirement to use Agity. <br /> You can always
          change them later✌️
        </Text>
      </Stack>
      <Box as={"form"}>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label="Agity uses your user ID to associate your teams with an identity. It must be unique. ">
                <span>
                  <FiHelpCircle color="black" />
                </span>
              </Tooltip>
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Your Username"
              onChange={handleUsernameChange}
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <InputRightElement>
              {uidCheck === UsernameCheckState.LOADING && (
                <SkeletonCircle w="1.25rem" h="1.25rem">
                  <span>
                    <FiSearch color="grey" />
                  </span>
                </SkeletonCircle>
              )}
              {uidCheck === UsernameCheckState.ERROR && (
                <Tooltip label="This user ID is not available.">
                  <span>
                    <FiXCircle color="red" />
                  </span>
                </Tooltip>
              )}
              {uidCheck === UsernameCheckState.VALID && (
                <Tooltip label="This user ID is available">
                  <span>
                    <FiCheckCircle color="green" />
                  </span>
                </Tooltip>
              )}
            </InputRightElement>
          </InputGroup>
          <InputGroup>
            <InputLeftElement>
              <Tooltip label="Your name may appear around Agity where you participate or are mentioned.">
                <span>
                  <FiHelpCircle color="black" />
                </span>
              </Tooltip>
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Your Display Name"
              onChange={(event) => setName(event.currentTarget.value)}
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
          </InputGroup>
        </Stack>
        <Button
          fontFamily={"heading"}
          mt={8}
          w={"full"}
          bgGradient="linear(to-r, red.400,pink.400)"
          color={"white"}
          _hover={{
            bgGradient: "linear(to-r, red.400,pink.500)",
            boxShadow: "xl",
          }}
          onClick={handleLogin}
          disabled={uidCheck !== UsernameCheckState.VALID}
        >
          Create your Profile
        </Button>
      </Box>
    </>
  );
};
