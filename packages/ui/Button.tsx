import { Button } from "@chakra-ui/react";

export const PinkButton = () => {
  return;
  <Button
    bgGradient="linear(to-r, red.400,pink.400)"
    color={"white"}
    _hover={{
      bgGradient: "linear(to-r, red.400,pink.500)",
    }}
  >
    Get Started
  </Button>;
};
