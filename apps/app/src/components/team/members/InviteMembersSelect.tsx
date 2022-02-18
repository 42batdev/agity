import {
  Profile,
  useSearchProfilesLazyQuery,
} from "../../../generated/graphql";
import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import React, { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SEARCH_RESULT_LIMIT = 5;

type SearchProfileResultFields = Pick<Profile, "id" | "name" | "avatar">;

export const InviteMembersSelect = (): JSX.Element => {
  const [search, { loading, data }] = useSearchProfilesLazyQuery();

  const [focusedInput, setFocusedInput] = useState(false);
  const [selected, setSelected] = useState<SearchProfileResultFields[]>([]);
  const [input, setInput] = useState("");

  const debouncedValidation = useRef(
    debounce((value: string) => {
      search({
        variables: {
          input: {
            uid: value,
            name: value,
            limit: SEARCH_RESULT_LIMIT,
          },
        },
      });
    }, 300)
  );

  const noSearchResults =
    !data || (!loading && data?.searchProfiles?.count === 0);
  const tooManySearchResults =
    !loading && (data?.searchProfiles?.count ?? 0) > SEARCH_RESULT_LIMIT;

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
            debouncedValidation.current.cancel();
            setInput(e.target.value);
            debouncedValidation.current(e.target.value);
          }}
        />
        <InputRightElement>
          <FiSearch />
        </InputRightElement>
      </InputGroup>
      {focusedInput && (
        <>
          <Wrap w="100%" rounded="4px" p="4" zIndex="100" bg="gray.600">
            {loading && <SearchTagSkeletons />}
            {noSearchResults && (
              <Tag size="lg" borderRadius="full" variant="outline">
                No Matches Found
              </Tag>
            )}
            {!loading &&
              data?.searchProfiles.profiles
                ?.filter(
                  (profile) => !selected.some((s) => s.id === profile.id)
                )
                ?.map((profile) => (
                  <ProfileTag
                    key={profile.id}
                    profile={profile}
                    onClick={() => {
                      setFocusedInput(false);
                      setSelected([...selected, profile]);
                    }}
                  />
                ))}
            {tooManySearchResults && (
              <Tag size="lg" borderRadius="full" variant="outline">
                ...
              </Tag>
            )}
          </Wrap>
        </>
      )}
      <Wrap w="100%" py="4">
        {selected?.map((profile, index) => (
          <ProfileTag
            key={profile.id}
            profile={profile}
            onCloseClick={() => {
              const newSelection = [...selected];
              newSelection.splice(index, 1);
              setSelected(newSelection);
            }}
          />
        ))}
      </Wrap>

      <Button isFullWidth>Confirm Invites</Button>
    </Box>
  );
};

function SearchTagSkeletons() {
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
}

function ProfileTag({
  profile,
  onClick,
  onCloseClick,
}: {
  profile: SearchProfileResultFields;
  onClick?: () => void;
  onCloseClick?: () => void;
}) {
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
}

export default InviteMembersSelect;
