import {
  Box,
  Container,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export interface AppHeaderProps {
  title: string;
  actions?: ReactNode;
}

export const AppHeader = ({ title, actions }: AppHeaderProps) => {
  return (
    <Box
      py="12"
      mb="8"
      borderBottom={useColorModeValue("1px solid #EEE", "1px solid #333")}
    >
      <Container maxW={"7xl"} columns={{ base: 1, md: 2 }}>
        <Flex alignItems="center" justifyContent={{ base: "space-between" }}>
          <Heading>{title}</Heading>
          {actions}
        </Flex>
      </Container>
    </Box>
  );
};
