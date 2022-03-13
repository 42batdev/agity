import {
  Avatar,
  AvatarProps,
  Box,
  Heading,
  HStack,
  Skeleton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export interface CardProps {
  title: string;
  description?: string;
  avatarProps?: AvatarProps;
  onClick?: () => void;
}

export default function Card({
  title,
  description,
  avatarProps,
  onClick,
}: CardProps) {
  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      bg={useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)")}
      backdropFilter="saturate(180%) blur(5px)"
      rounded={"lg"}
      _hover={
        onClick && {
          bgGradient: "linear(to-r, red.400,pink.500)",
          cursor: "pointer",
        }
      }
      userSelect="none"
      onClick={onClick}
    >
      <HStack>
        {avatarProps && (
          <Avatar
            mr="2"
            size="lg"
            color="gray.100"
            border="2px solid white"
            {...avatarProps}
          />
        )}
        <VStack w="100%" alignItems="flex-start" isTruncated>
          <Text width="100%" isTruncated>
            {description}&nbsp;
          </Text>
          <Heading
            fontSize="xl"
            fontWeight={500}
            fontFamily="body"
            width="100%"
            isTruncated
          >
            {title}
          </Heading>
        </VStack>
      </HStack>
    </Box>
  );
}

export function CardSkeleton() {
  return (
    <Skeleton>
      <Card title="Loading" />
    </Skeleton>
  );
}
