import { useUserProfileQuery } from "../../../../generated/graphql";
import { useSignOut } from "../../../../supabase/AuthContext";
import {
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SkeletonCircle,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { FiChevronDown, FiEdit, FiLogOut, FiMoon, FiSun } from "react-icons/fi";

export const AppBarLogo = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 512 512"
    >
      <path
        fill="#00AB8E"
        d="M429.9 288.3a259.8 259.8 0 0 1-373.7 1.5c-15-14.7-33.8-14.4-46.5-1.5a33 33 0 0 0-1.2 45.5l.6.6a289.8 289.8 0 0 0 416.7-.3A306.8 306.8 0 0 0 504.7 54a277 277 0 0 1-74.2 233.7l-.6.6z"
      />
      <linearGradient
        id="a"
        x1="-228.2"
        x2="-82.4"
        y1="1318"
        y2="1318"
        gradientTransform="translate(237.1 -870.4)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#f56565" />
        <stop offset="1" stopColor="#ed64a6" />
      </linearGradient>
      <path
        fill="url(#a)"
        d="M9 512h101.2l44.5-96.3a288.7 288.7 0 0 1-83-32.4L9 512z"
      />
      <linearGradient
        id="b"
        x1="-137.3"
        x2="273.3"
        y1="1126.4"
        y2="1126.4"
        gradientTransform="translate(237.1 -870.4)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#f56565" />
        <stop offset="1" stopColor="#ed64a6" />
      </linearGradient>
      <path
        fill="url(#b)"
        d="m258.8 0-159 325.7c25.1 16.4 52.2 28.1 80.3 35l78.7-170.4L409.1 512h101.3L258.8 0z"
      />
    </svg>
  );
};

export const AppBarSlash = (props) => {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M16.9 3.5 7 20.5" />
    </svg>
  );
};

export const AppBarUser = () => {
  const { loading, data } = useUserProfileQuery();
  const signOut = useSignOut();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu id="user-menu" matchWidth isLazy>
      <MenuButton p="2">
        <HStack>
          <SkeletonCircle isLoaded={!loading}>
            <Avatar
              size="sm"
              src={data?.getUserProfile?.avatar?.url ?? undefined}
            />
          </SkeletonCircle>
          <FiChevronDown />
        </HStack>
      </MenuButton>
      <MenuList>
        <NextLink href="/dashboard" passHref>
          <MenuItem minH="42px" icon={<FiEdit />}>
            Dashboard
          </MenuItem>
        </NextLink>

        <MenuDivider />

        <HStack px="2" justifyContent={"space-between"}>
          <IconButton
            aria-label="Switch Theme"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
          />
          <IconButton
            variant={"ghost"}
            aria-label="Logout"
            icon={<FiLogOut />}
            onClick={() => signOut()}
          />
        </HStack>
      </MenuList>
    </Menu>
  );
};
