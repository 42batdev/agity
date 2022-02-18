import { useSearchProfilesLazyQuery } from "../../../generated/graphql";
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
  VStack,
  Wrap,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import React, { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SEARCH_RESULT_LIMIT = 5;

export const InviteMembersSelect = (): JSX.Element => {
  const [search, { loading, data }] = useSearchProfilesLazyQuery();

  const [focusedInput, setFocusedInput] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
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
                  <Tag
                    key={profile.id}
                    size="lg"
                    borderRadius="full"
                    variant={"subtle"}
                    _hover={{ cursor: "pointer" }}
                    onClick={() => {
                      setFocusedInput(false);
                      setSelected([...selected, profile]);
                    }}
                  >
                    <Avatar
                      size="xs"
                      src={profile.avatar?.url ?? undefined}
                      ml={-2}
                      mr={2}
                    />
                    <TagLabel>{profile.name}</TagLabel>
                  </Tag>
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
          <Tag
            key={profile.id}
            size="lg"
            borderRadius="full"
            variant={"subtle"}
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              const newSelection = [...selected];
              newSelection.splice(index, 1);
              setSelected(newSelection);
            }}
          >
            <Avatar
              size="xs"
              src={profile.avatar?.url ?? undefined}
              ml={-2}
              mr={2}
            />
            <TagLabel>{profile.name}</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
      </Wrap>

      <VStack alignItems="stretch">
        <Button isFullWidth>Confirm Invites</Button>
      </VStack>
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

export default InviteMembersSelect;
