import { Text, TextProps } from "@chakra-ui/layout";
import {
  Box,
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => (
  <Box as="footer" mx="auto" maxW="7xl" py="12" px={{ base: "4", md: "8" }}>
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Copyright alignSelf={{ base: "center", sm: "start" }} />
        <SocialMediaLinks />
      </Stack>
    </Stack>
  </Box>
);

const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    in|team &copy; {new Date().getFullYear()} DeviantDev, All rights reserved.
  </Text>
);

const SocialMediaLinks = (props: ButtonGroupProps) => (
  <>
    <ButtonGroup variant="ghost" color="gray.600" {...props}>
      <IconButton
        as="a"
        href="#"
        aria-label="LinkedIn"
        icon={<FaEnvelope fontSize="20px" />}
      />
      <IconButton
        as="a"
        href="#"
        aria-label="GitHub"
        icon={<FaGithub fontSize="20px" />}
      />
      <IconButton
        as="a"
        href="#"
        aria-label="LinkedIn"
        icon={<FaLinkedin fontSize="20px" />}
      />
      <IconButton
        as="a"
        href="#"
        aria-label="Twitter"
        icon={<FaTwitter fontSize="20px" />}
      />
    </ButtonGroup>
  </>
);
