import { getUserDashboardLink } from "../../../functions/AgityRouter";
import {
  Box,
  Button,
  Divider,
  Flex,
  FlexProps,
  SimpleGrid,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import * as React from "react";
import { FaBitbucket, FaGithub, FaGitlab, FaGoogle } from "react-icons/fa";

export const OAuth = () => {
  const signIn = (credentials) =>
    supabaseClient.auth.signIn(credentials, {
      redirectTo: getUserDashboardLink(),
    });

  return (
    <>
      <DividerWithText mt="6">or continue with</DividerWithText>
      <SimpleGrid columns={4} spacing="4" my={4}>
        <Tooltip label="Google">
          <Button
            color="gray.700"
            bg="gray.100"
            _hover={{
              color: "gray.100",
              bgGradient: "linear(to-r, red.400,pink.500)",
              boxShadow: "xl",
            }}
            onClick={() => signIn({ provider: "google" })}
          >
            <VisuallyHidden>Login with Google</VisuallyHidden>
            <FaGoogle />
          </Button>
        </Tooltip>
        <Tooltip label="Gitlab">
          <Button
            color="gray.700"
            bg="gray.100"
            _hover={{
              color: "gray.100",
              bgGradient: "linear(to-r, red.400,pink.500)",
              boxShadow: "xl",
            }}
            onClick={() => signIn({ provider: "gitlab" })}
          >
            <VisuallyHidden>Login with Gitlab</VisuallyHidden>
            <FaGitlab />
          </Button>
        </Tooltip>
        <Tooltip label="Github">
          <Button
            color="gray.700"
            bg="gray.100"
            _hover={{
              color: "gray.100",
              bgGradient: "linear(to-r, red.400,pink.500)",
              boxShadow: "xl",
            }}
            onClick={() => signIn({ provider: "github" })}
          >
            <VisuallyHidden>Login with Github</VisuallyHidden>
            <FaGithub />
          </Button>
        </Tooltip>
        <Tooltip color="gray.500" label="Bitbucket">
          <Button
            color="gray.700"
            bg="gray.100"
            _hover={{
              color: "gray.100",
              bgGradient: "linear(to-r, red.400,pink.500)",
              boxShadow: "xl",
            }}
            onClick={() => signIn({ provider: "bitbucket" })}
          >
            <VisuallyHidden>Login with Bitbucket</VisuallyHidden>
            <FaBitbucket />
          </Button>
        </Tooltip>
      </SimpleGrid>
    </>
  );
};

const DividerWithText = (props: FlexProps) => {
  const { children, ...flexProps } = props;
  return (
    <Flex align="center" my={5} {...flexProps}>
      <Box flex="1">
        <Divider borderColor="gray.700" />
      </Box>
      <Text color="gray.700" as="span" px="3" fontWeight="medium">
        {children}
      </Text>
      <Box flex="1">
        <Divider borderColor="gray.700" />
      </Box>
    </Flex>
  );
};
