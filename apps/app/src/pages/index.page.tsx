import { useAgityRouter } from "../functions/AgityRouter";
import { LoginAvatarGroup } from "./login/components/LoginAvatarGroup";
import { LoginForm } from "./login/components/LoginForm";
import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { User } from "@supabase/supabase-js";
import Head from "next/head";
import React, { useEffect } from "react";

export default function Login() {
  return <LoginContent />;
}

const LoginContent = () => {
  const router = useAgityRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      checkUserProfileExists(user).then((exists) => {
        exists ? router.openUserDashboard() : router.openUserOnboarding();
      });
    }
  }, [isLoading, user, router]);

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
          {!isLoading && !user && <LoginForm />}
        </Stack>
      </Container>
    </>
  );
};

export function checkUserProfileExists(user: User) {
  return supabaseClient
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .match({ id: user.id })
    .then((result) => result.count ?? 0 > 0);
}
