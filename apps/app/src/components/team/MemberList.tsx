import { SimpleGrid } from "@chakra-ui/react";
import MemberCard from "./MemberCard";
import React from "react";

export interface MemberListProps {
  tid: string;
}

export const MemberList = ({ tid }: MemberListProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      <MemberCard name="John Doe" />
    </SimpleGrid>
  );
};
