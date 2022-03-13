import { CardSkeleton } from "./Card";
import { SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface CardGridProps {
  loading?: boolean;
  children: ReactNode;
}

export const CardGrid = ({ loading, children }: CardGridProps) => {
  const router = useRouter();

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      {loading && (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
      {!loading && children}
    </SimpleGrid>
  );
};
