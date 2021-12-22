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
            Team First
          </MenuButton>
          <MenuList>
            <MenuGroup title="Your Teams">
              <MenuItem>
                <NextLink href="/app/first" as="/first">
                  Team First
                </NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/app/second" as="/second">
                  Team Second
                </NextLink>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem>
              <NextLink href="/app/newid/" as="/newid">
                Add a new team
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      id: "2",
      children: <NextLink href={`/`}>Dashboard</NextLink>,
    },
    {
      id: "3",
      children: <NextLink href={`people`}>People</NextLink>,
    },
    {
      id: "4",
      children: <NextLink href={`meetings`}>Meetings</NextLink>,
    },
    {
      id: "5",
      children: <NextLink href={`settings`}>Settings</NextLink>,
    },
  ];
  return (
    <PageLayout>
      <PageAppBar links={links} />
      <PageContent>
        <p>Team ID: {id}</p>
        {children}
      </PageContent>
    </PageLayout>
  );
};
