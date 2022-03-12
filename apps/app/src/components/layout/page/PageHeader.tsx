import { AppBarLogo, AppBarSlash, AppBarUser } from "./PageHeaderComponents";
import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { ReactNode } from "react";

export type PageHeaderLink = {
  title: string;
  active: boolean;
  onNavigate: () => void;
};

interface PageHeaderProps {
  breadcrumbs: Array<PageHeaderLink>;
  links: Array<PageHeaderLink>;
}

export const PageHeader = ({ breadcrumbs, links }: PageHeaderProps) => {
  return (
    <Box
      as="header"
      position="fixed"
      gridColumn="1/-1"
      gridRow="2"
      zIndex="250"
      w="100%"
      borderBottom={useColorModeValue("1px solid #EEE", "1px solid #333")}
      bg={useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)")}
      backdropFilter="saturate(180%) blur(5px)"
    >
      <Container maxW={"5xl"}>
        <Flex py="4" alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <NextLink href="/" passHref>
              <Link>
                <AppBarLogo height="32px" />
              </Link>
            </NextLink>
            {breadcrumbs.map(({ onNavigate, title }) => (
              <HStack key={title}>
                <AppBarSlash height="32px" />
                <Link onClick={onNavigate}>{title}</Link>
              </HStack>
            ))}
          </HStack>
          <AppBarUser />
        </Flex>
        <Flex ml="-2" alignItems={"center"} justifyContent={"space-between"}>
          <HStack as={"nav"} spacing="6">
            {links.map((link) => (
              <NavigationLink key={link.title} {...link}>
                {link.title}
              </NavigationLink>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

const NavigationLink = ({
  onNavigate,
  active,
  children,
}: PageHeaderLink & { children: ReactNode }) => {
  const borderColor = useColorModeValue("#333", "#FFF");

  return (
    <Link
      p="2"
      borderBottom={`1px solid ${active ? borderColor : "transparent"}`}
      _hover={{
        borderBottom: `1px solid ${borderColor}`,
      }}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
};
