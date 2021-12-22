import { Box } from "@chakra-ui/react";
import * as React from "react";

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box as="main" minH="100%" zIndex="200" gridColumn="2" gridRow="3">
      {children}
    </Box>
  );
};
