import { Profile } from "../../../../generated/graphql";
import {
  Avatar,
  Skeleton,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import React from "react";

export type ProfileTagFields = Pick<Profile, "id" | "name" | "avatar">;

export interface ProfileTagProps {
  profile: ProfileTagFields;
  onClick?: () => void;
  onCloseClick?: () => void;
}

const ProfileTag = ({ profile, onClick, onCloseClick }: ProfileTagProps) => {
  return (
    <Tag
      size="lg"
      borderRadius="full"
      variant={"subtle"}
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Avatar size="xs" src={profile.avatar?.url ?? undefined} ml={-2} mr={2} />
      <TagLabel>{profile.name}</TagLabel>
      {onCloseClick && <TagCloseButton onClick={onCloseClick} />}
    </Tag>
  );
};

export default ProfileTag;

export const ProfileTagSkeletons = () => {
  return (
    <>
      <Skeleton rounded="full">
        <Tag size="lg" borderRadius="full" variant="outline">
          Loading First ...
        </Tag>
      </Skeleton>
      <Skeleton rounded="full">
        <Tag size="lg" borderRadius="full" variant="outline">
          Loading ...
        </Tag>
      </Skeleton>
    </>
  );
};
