import { Box, Center, useColorModeValue } from "@chakra-ui/react";

export interface MemberCardContentProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function MemberCardContent({
  disabled,
  onClick,
  children,
}: MemberCardContentProps) {
  const hover = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    bg: useColorModeValue("gray.100", "gray.900"),
    cursor: "pointer",
  };

  return (
    <Center py={6} position="relative">
      <Box
        maxW="270px"
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
        _hover={!disabled ? hover : {}}
        onClick={() => !disabled && onClick()}
        position="relative"
      >
        {children}
      </Box>
    </Center>
  );
}
