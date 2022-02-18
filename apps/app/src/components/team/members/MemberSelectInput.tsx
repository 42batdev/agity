import { useSearchProfilesLazyQuery } from "../../../generated/graphql";
import {
  Avatar,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Tag,
  TagLabel,
  Wrap,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import React, { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SEARCH_RESULT_LIMIT = 5;

export const MemberSelectInput = (): JSX.Element => {
  const [search, { loading, data }] = useSearchProfilesLazyQuery();

  const [focusedInput, setFocusedInput] = useState(false);
  const [focusedButton, setFocusedButton] = useState(false);
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
      {input && (focusedInput || focusedButton) ? (
        <Wrap
          w="100%"
          rounded="4px"
          p="4"
          zIndex="100"
          bg="gray.600"
          onFocus={() => setFocusedButton(true)}
          onBlur={() => setFocusedButton(false)}
        >
          {data?.searchProfiles.profiles?.map((profile) => (
            <Tag
              key={profile.id}
              size="lg"
              borderRadius="full"
              variant={"subtle"}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setInput(profile.name);
                setFocusedButton(false);
                setFocusedInput(false);
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
          {data?.searchProfiles.profiles &&
            data.searchProfiles.count > SEARCH_RESULT_LIMIT && (
              <Tag size="lg" borderRadius="full" variant="outline">
                ...
              </Tag>
            )}
          {loading && (
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
          )}
        </Wrap>
      ) : null}
    </Box>
  );
};

export default MemberSelectInput;
