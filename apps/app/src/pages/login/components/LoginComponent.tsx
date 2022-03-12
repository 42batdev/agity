import { LoginAvatarGroup } from "./LoginAvatarGroup";
import { LoginForm } from "./LoginForm";
import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

export const LoginComponent = () => {
  return (
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
  );
};
