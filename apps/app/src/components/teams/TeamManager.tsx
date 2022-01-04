import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { useTeams } from "supabase";
import { CreateTeamModal } from "./CreateTeamModal";
import { useRouter } from "next/router";

export const TeamManager = () => {
  const router = useRouter();

  const { data, isLoading } = useTeams();
  return (
    <>
      <Box
        py="12"
        mb="8"
        borderBottom={useColorModeValue("1px solid #EEE", "1px solid #333")}
      >
        <Container maxW={"7xl"} columns={{ base: 1, md: 2 }}>
          <Flex alignItems="center" justifyContent={{ base: "space-between" }}>
            <Heading>Your Teams</Heading>
            <CreateTeamModal />
          </Flex>
        </Container>
      </Box>
      <Container maxW={"7xl"} columns={{ base: 1, md: 2 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          {!isLoading &&
            data?.map((team) => (
              <TeamCard
                key={team.id}
                title={"Admin"}
                stat={team.name}
                onClick={() => {
                  console.log("Test");
                  router.push(`/teams/${team.id}`);
                }}
              />
            ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

interface TeamCardProps {
  title: string;
  stat: string;
  onClick: () => void;
}

function TeamCard({ title, stat, onClick }: TeamCardProps) {
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
      <Flex justifyContent={"flex-start"}>
        <Box my={"auto"} color={useColorModeValue("gray.800", "gray.200")}>
          <FiUsers size={"3em"} />
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
