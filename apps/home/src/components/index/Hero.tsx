import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

export default function Hero() {
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
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "2xl", md: "4xl", lg: "5xl" }}
        >
          Built for
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            {" agile teams "}
          </Text>
          to meet, refine, and reflect.{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            <br />
            <br />
            {"Your in|team space!"}
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
        <img src="https://cdn.pixabay.com/photo/2021/03/26/21/51/video-conference-6127000_960_720.jpg" />
      </Stack>
    </Container>
  );
}
