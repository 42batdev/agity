import { Box, Container } from "@chakra-ui/react";
import * as React from "react";

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box as="main" minH="100%" zIndex="200" mt="32" gridColumn="2" gridRow="3">
      <Container maxW={"5xl"}>{children}</Container>
    </Box>
  );
};
