import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactNode, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import supabase from "supabase";
import { PageAppBar, PageContent, PageLayout } from "ui";

export interface AppLayoutProps {
  id?: string;
  children: ReactNode;
}

export const AppLayout = ({ id, children }: AppLayoutProps) => {
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    supabase.from("teams").select("*").then(console.log);
  };

  let links = [
    {
      id: "1",
      children: (
        <Menu id="team_selection" isLazy>
          <MenuButton as={Button} rightIcon={<FiChevronDown />}>
            No team selected
          </MenuButton>
          <MenuList>
            <MenuGroup title="Your Teams">
              <NextLink href="/teams/team-a" passHref>
                <MenuItem>Team A</MenuItem>
              </NextLink>
              <NextLink href="/teams/team-b" passHref>
                <MenuItem>Team B</MenuItem>
              </NextLink>
            </MenuGroup>
            <MenuDivider />
            <NextLink href="/teams" passHref>
              <MenuItem>Manage your teams</MenuItem>
            </NextLink>
          </MenuList>
        </Menu>
      ),
    },
  ];
  return (
    <PageLayout>
      <PageAppBar links={links} />
      <PageContent>{children}</PageContent>
    </PageLayout>
  );
};
