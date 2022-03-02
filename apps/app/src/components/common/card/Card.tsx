import {
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

export interface CardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

export default function Card({ title, description, onClick }: CardProps) {
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
      <StatLabel fontWeight={"medium"} isTruncated>
        {description}&nbsp;
      </StatLabel>
      <StatNumber isTruncated>{title}</StatNumber>
    </Stat>
  );
}

export function CardSkeleton() {
  return (
    <Skeleton>
      <Card title="Loading" />
    </Skeleton>
  );
}
