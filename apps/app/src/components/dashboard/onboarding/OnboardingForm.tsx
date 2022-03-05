import { useCreateUserProfileMutation } from "../../../generated/graphql";
import { validIDPattern } from "../../../server/graphql/errors";
import { checkUidExists } from "../../../supabase/utils";
import ValidatedInput from "../../common/ValidateInput";
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const OnboardingForm = () => {
  const router = useRouter();
  const [mutate] = useCreateUserProfileMutation();

  const [uidValid, setUidValid] = useState(true);
  const [uid, setUid] = useState<string>("");
  const [name, setName] = useState<string>("");

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
          <ValidatedInput
            onChange={(value) => setUid(value)}
            onValidate={(value) => {
              return checkUidExists(value).then((exists) => {
                const valid = validIDPattern.test(value);
                setUidValid(valid && !exists);
                return !valid || exists;
              });
            }}
            helpLabel="Agity uses your user ID to associate your teams with an identity. It must be unique."
            inputProps={{
              type: "text",
              placeholder: "Your User ID",
              bg: "gray.100",
              color: "gray.500",
              border: 0,
              _placeholder: {
                color: "gray.500",
              },
            }}
          />
          <InputGroup>
            <InputLeftElement>
              <Tooltip label="Your name may appear around Agity where you participate or are mentioned.">
                <span>
                  <FiHelpCircle color="grey" />
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
          isDisabled={!uidValid || uid.length === 0 || name.length === 0}
        >
          Create your Profile
        </Button>
      </Box>
    </>
  );
};
