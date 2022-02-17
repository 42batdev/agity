import {
  Box,
  Flex,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";

export interface TeamCardProps {
  name: string;
  permissionLevel?: string;
  onClick?: () => void;
}

export default function TeamCard({
  permissionLevel,
  name,
  onClick,
}: TeamCardProps) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      bg={useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)")}
      backdropFilter="saturate(180%) blur(5px)"
      rounded={"lg"}
      _hover={{
        bgGradient: "linear(to-r, red.400,pink.500)",
        cursor: "pointer",
      }}
      userSelect="none"
      onClick={onClick}
    >
      <StatNumber isTruncated>{name}</StatNumber>
      <StatLabel fontWeight={"medium"} isTruncated>
        {permissionLevel}&nbsp;
      </StatLabel>
    </Stat>
  );
}

export function TeamCardSkeleton() {
  return (
    <Skeleton>
      <TeamCard name="Loading" />
    </Skeleton>
  );
}
