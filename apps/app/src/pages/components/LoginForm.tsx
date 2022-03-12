import supabase from "../../supabase";
import { OAuth } from "./OAuth";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

enum SignInState {
  NONE,
  LOADING,
  CHECKMAIL,
  ERROR,
}

export const LoginForm = () => {
  const router = useRouter();
  const signIn = (credentials) => supabase.auth.signIn(credentials);

  const [email, setEmail] = useState("");
  const [signInState, setSignInState] = useState<SignInState>(SignInState.NONE);

  const handleLogin = async () => {
    setSignInState(SignInState.LOADING);

    signIn({ email }).then(({ error }) => {
      if (error) {
        setSignInState(SignInState.ERROR);
      } else {
        setSignInState(SignInState.CHECKMAIL);
      }
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
          Login Now
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          No sign up needed to <Link color={"blue.400"}>get started </Link>
          ✌️
        </Text>
      </Stack>
      {(signInState === SignInState.NONE ||
        signInState === SignInState.LOADING) && (
        <Box as={"form"}>
          <Stack spacing={4}>
            <Input
              type="email"
              placeholder="Your Mail Address"
              onChange={(event) => setEmail(event.currentTarget.value)}
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
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
            type="submit"
            onClick={handleLogin}
            isLoading={signInState === SignInState.LOADING}
          >
            Sign In
          </Button>
          <OAuth />
        </Box>
      )}
      {signInState === SignInState.ERROR && (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          color="red.700"
          bg="red.100"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            An error occurred!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Darn... Something went wrong. Please try again.
          </AlertDescription>
          <Button
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.500)",
              boxShadow: "xl",
            }}
            onClick={() => router.reload()}
          >
            Reload
          </Button>
        </Alert>
      )}
      {signInState === SignInState.CHECKMAIL && (
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          color="gray.700"
          bg="gray.100"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Check your mailbox!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            We sent a magic link to: {email}.
            <br />
            <br />
            Follow the instructions to complete signing in!
            <br /> You can close this tab now.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
