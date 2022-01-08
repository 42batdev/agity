import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface AppHeaderProps {
  title: string;
  actions?: ReactNode;
}

export const PageSubHeader = ({ title, actions }: AppHeaderProps) => {
  return (
    <Box pb={8}>
      <Flex alignItems="center" justifyContent={{ base: "space-between" }}>
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        {actions}
      </Flex>
      <Text>The Teams you have access to</Text>
    </Box>
  );
};
