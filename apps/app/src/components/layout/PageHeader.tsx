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
import { useRouter } from "next/router";
import * as React from "react";
import { ReactNode } from "react";

export type PageHeaderLink = {
  title: string;
  href: string;
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
            {breadcrumbs.map(({ href, title }) => (
              <HStack key={href}>
                <AppBarSlash height="32px" />
                <NextLink href={href} passHref>
                  {title}
                </NextLink>
              </HStack>
            ))}
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
  const router = useRouter();
  const isActiveLink = router.asPath === href;
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
