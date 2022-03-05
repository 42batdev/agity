import { LoginAvatarGroup } from "../components/login/LoginAvatarGroup";
import { LoginForm } from "../components/login/LoginForm";
import supabase from "../supabase";
import { checkUserProfileExists } from "../supabase/utils";
import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Login() {
  return <LoginContent />;
}

const LoginContent = () => {
  const router = useRouter();

  const user = supabase.auth.user();
  if (user) {
    checkUserProfileExists(user).then((exists) => {
      exists ? router.push("/dashboard") : router.push("/dashboard/onboarding");
    });
    return (
      <>
        <Head>
          <title>Agity Redirecting...</title>
        </Head>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>A G I T Y Login</title>
        </Head>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
          textAlign="center"
        >
          <Stack spacing={{ base: 10, md: 20 }} justifyContent="center">
            <LoginAvatarGroup />
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "2xl", md: "4xl", lg: "5xl" }}
            >
              Enable your
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                {" team "}
              </Text>
              to level up
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                {" agility!"}
              </Text>
            </Heading>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <LoginForm />
          </Stack>
        </Container>
      </>
    );
  }
};
