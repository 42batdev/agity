import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPlus, FiServer } from "react-icons/fi";

export const TeamManager = () => {
  return (
    <>
      <Box py="12" mb="8" borderBottom="1px solid white">
        <Container maxW={"7xl"} columns={{ base: 1, md: 2 }}>
          <Flex alignItems="center" justifyContent={{ base: "space-between" }}>
            <Heading>Your Teams</Heading>
            <HStack>
              <Button variant="outline">Join</Button>
              <Button leftIcon={<FiPlus />}>Create</Button>
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"7xl"} columns={{ base: 1, md: 2 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={"Member"} stat={"Team A"} />
          <StatsCard title={"Admin"} stat={"Team B"} />
          <StatsCard title={"Admin"} stat={"Team C"} />
        </SimpleGrid>
      </Container>
    </>
  );
};

interface StatsCardProps {
  title: string;
  stat: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      bg={useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)")}
      backdropFilter="saturate(180%) blur(5px)"
      rounded={"lg"}
    >
      <Flex justifyContent={"flex-start"}>
        <Box my={"auto"} color={useColorModeValue("gray.800", "gray.200")}>
          <FiServer size={"3em"} />
        </Box>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
      </Flex>
    </Stat>
  );
}
