import * as React from "react";
import { ReactNode } from "react";
import { useSession } from "supabase";
import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AppBarComponents, AppBarSlash, AppBarUser } from "./AppBarComponents";
import { useRouter } from "next/router";

interface PageHeaderLink {
  title: string;
  href: string;
}

interface PageHeaderProps {
  links?: Array<PageHeaderLink>;
}

export const PageHeader = ({ links }: PageHeaderProps) => {
  const session = useSession();

  return (
    <Box
      as="header"
      gridColumn="1/-1"
      gridRow="2"
      zIndex="250"
      borderBottom={useColorModeValue("1px solid #EEE", "1px solid #333")}
      bg={useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)")}
      backdropFilter="saturate(180%) blur(5px)"
    >
      <Container maxW={"5xl"}>
        <Flex py="4" alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <AppBarComponents height="32px" />
            <AppBarSlash height="32px" />
            <HStack>
              <Avatar size="xs" />
              <Text>{session?.user?.email}</Text>
            </HStack>
          </HStack>
          <AppBarUser />
        </Flex>
        <Flex ml="-2" alignItems={"center"} justifyContent={"space-between"}>
          <HStack as={"nav"} spacing="6">
            {links.map((link) => (
              <NavigationLink key={link.href} href={link.href}>
                {link.title}
              </NavigationLink>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

interface NavigationLinkProps {
  href: string;
  children: ReactNode;
}

const NavigationLink = ({ href, children }: NavigationLinkProps) => {
  const isActiveLink = useRouter()?.pathname === href;
  const borderColor = useColorModeValue("#333", "#FFF");

  return (
    <NextLink href={href} passHref>
      <Link
        p="2"
        borderBottom={`1px solid ${isActiveLink ? borderColor : "transparent"}`}
        _hover={{
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        {children}
      </Link>
    </NextLink>
  );
};
