import {
  useGetTeamByTidQuery,
  useInviteToTeamMutation,
  useSearchProfilesLazyQuery,
} from "../../../../generated/graphql";
import { useTid } from "../../dashboard/TeamNavigationContext";
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
import React, { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SEARCH_RESULT_CLIENT_LIMIT = 5;
const SEARCH_RESULT_SERVER_LIMIT = 10;

export const InviteMembersSelect = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const { data: teamData } = useGetTeamByTidQuery({
    variables: { tid: useTid() },
  });
  const [
    search,
    { loading, data: searchData, fetchMore: fetchMoreSearchData },
  ] = useSearchProfilesLazyQuery();
  const [mutate] = useInviteToTeamMutation();

  const [selected, setSelected] = useState<ProfileTagFields[]>([]);
  const [input, setInput] = useState("");

  const debouncedValidation = useRef(
    debounce((value: string) => {
      search({
        variables: {
          input: {
            uid: value,
            name: value,
            limit: SEARCH_RESULT_SERVER_LIMIT,
          },
        },
      });
    }, 300)
  );

  const noSearchResults =
    !searchData || searchData?.searchProfiles?.count === 0;
  const tooManySearchResults =
    !loading &&
    (searchData?.searchProfiles?.count ?? 0) > SEARCH_RESULT_CLIENT_LIMIT;

  return (
    <Box position="relative" width="100%" pb="2">
      <InputGroup>
        <Input
          width="100%"
          placeholder="Search ..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            debouncedValidation.current.cancel();
            debouncedValidation.current(e.target.value);
          }}
        />
        <InputRightElement>
          <FiSearch />
        </InputRightElement>
      </InputGroup>
      <Wrap w="100%" rounded="4px" p="4" zIndex="100" bg="gray.600">
        {loading && <ProfileTagSkeletons />}
        {!loading && noSearchResults && (
          <Tag size="lg" borderRadius="full" variant="outline">
            No Matches Found
          </Tag>
        )}
        {!loading &&
          teamData?.getTeam?.members &&
          searchData?.searchProfiles.profiles
            .filter((profile) => !selected.some((s) => s.id === profile.id))
            .slice(0, SEARCH_RESULT_CLIENT_LIMIT)
            .map((profile) => (
              <ProfileTag
                key={profile.id}
                profile={profile}
                onClick={() => {
                  setSelected([...selected, profile]);
                  if (selected.length > SEARCH_RESULT_CLIENT_LIMIT) {
                    debouncedValidation.current(input);
                  }
                }}
              />
            ))}
        {tooManySearchResults && (
          <Tag size="lg" borderRadius="full" variant="outline">
            ...
          </Tag>
        )}
      </Wrap>

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
