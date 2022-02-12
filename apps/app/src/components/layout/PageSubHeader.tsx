import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface AppHeaderProps {
  title: string;
  subTitle?: string;
  actions?: ReactNode;
}

export const PageSubHeader = ({ title, subTitle, actions }: AppHeaderProps) => {
  return (
    <Box py={8}>
      <Flex alignItems="center" justifyContent={{ base: "space-between" }}>
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        {actions}
      </Flex>
      {subTitle && <Text>{subTitle}</Text>}
    </Box>
  );
};
