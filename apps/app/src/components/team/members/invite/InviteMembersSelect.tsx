import {
  GetTeamByTidQuery,
  SearchProfilesQuery,
  useInviteToTeamMutation,
  useSearchProfilesLazyQuery,
} from "../../../../generated/graphql";
import { useTeam } from "../../useTeam";
import ProfileTag, {
  ProfileTagFields,
  ProfileTagSkeletons,
} from "./ProfileTag";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  Wrap,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SEARCH_RESULT_LIMIT = 5;

export const InviteMembersSelect = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const { data: teamData } = useTeam();

  const [search, { loading, data: searchData }] = useSearchProfilesLazyQuery({
    fetchPolicy: "cache-first",
  });
  const [mutate] = useInviteToTeamMutation();

  const [focusedInput, setFocusedInput] = useState(false);
  const [selected, setSelected] = useState<ProfileTagFields[]>([]);
  const [input, setInput] = useState("");

  const debouncedValidation = useRef(
    debounce((value: string, addToLimit = 0) => {
      search({
        variables: {
          input: {
            uid: value,
            name: value,
            limit: SEARCH_RESULT_LIMIT + addToLimit,
          },
        },
      });
    }, 300)
  );

  useEffect(() => {
    debouncedValidation.current.cancel();
    debouncedValidation.current(input, selected.length);
  }, [debouncedValidation, input, selected]);

  return (
    <Box position="relative" width="100%" pb="2">
      <InputGroup
        onFocus={() => setFocusedInput(true)}
        onBlur={() => {
          setTimeout(() => {
            setFocusedInput(false);
          }, 150);
        }}
      >
        <Input
          width="100%"
          placeholder="Search ..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <InputRightElement>
          <FiSearch />
        </InputRightElement>
      </InputGroup>
      {focusedInput && (
        <Wrap w="100%" rounded="4px" p="4" zIndex="100" bg="gray.600">
          {loading && !searchData && <ProfileTagSkeletons />}
          {!loading &&
            renderSearchResults(searchData, selected, teamData, (profile) => {
              setSelected([...selected, profile]);
              setFocusedInput(false);
              setInput("");
            })}
        </Wrap>
      )}
      {renderSelectedProfilesComponent(selected, (profile) => {
        setSelected(selected.filter((s) => s.id !== profile.id));
      })}

      <Button
        isFullWidth
        onClick={() => {
          mutate({
            variables: {
              input: {
                profileIds: selected.map((p) => p.id),
                teamId: teamData?.getTeam?.id!,
              },
            },
          }).then(onClose);
        }}
      >
        Confirm Invites
      </Button>
    </Box>
  );
};

export default InviteMembersSelect;

function renderSearchResults(
  searchData: SearchProfilesQuery | undefined,
  selected: ProfileTagFields[],
  teamData: GetTeamByTidQuery | undefined,
  onClick: (profile: ProfileTagFields) => void
) {
  const searchResults =
    searchData?.searchProfiles.profiles
      .filter(
        (profile) =>
          !selected.some((s) => s.id === profile.id) &&
          !teamData?.getTeam?.members.some((m) => m.profile.id === profile.id)
      )
      .slice(0, SEARCH_RESULT_LIMIT)
      .map((profile) => (
        <ProfileTag
          key={profile.id}
          profile={profile}
          onClick={() => onClick(profile)}
        />
      )) ?? [];

  if (searchResults.length === 0) {
    return (
      <Tag size="lg" borderRadius="full" variant="outline">
        No Matches Found
      </Tag>
    );
  } else if (
    (searchData?.searchProfiles?.count ?? 0) >
    SEARCH_RESULT_LIMIT + selected.length
  ) {
    searchResults.push(
      <Tag size="lg" borderRadius="full" variant="outline">
        ...
      </Tag>
    );
  }
  return searchResults;
}

function renderSelectedProfilesComponent(
  selected: ProfileTagFields[],
  removeSelected: (profile: ProfileTagFields) => void
) {
  return (
    <Wrap w="100%" py="4">
      {selected?.map((profile) => (
        <ProfileTag
          key={profile.id}
          profile={profile}
          onCloseClick={() => removeSelected(profile)}
        />
      ))}
    </Wrap>
  );
}
