import {
  useUpdateUserProfileMutation,
  useUserProfileQuery,
} from "../../../generated/graphql";
import { validateId } from "../../../server/graphql/errors";
import { useUser } from "../../../supabase/AuthContext";
import { checkUidExists } from "../../../supabase/utils";
import { SectionContainer } from "../../common/SectionContainer";
import ValidatedInput from "../../common/ValidateInput";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
} from "@chakra-ui/react";
import React, { useLayoutEffect, useState } from "react";

export function AccountUsernameSettingsSection() {
  const [uid, setUid] = useState("");
  const [uidValid, setUidValid] = useState(true);

  const { loading, data } = useUserProfileQuery();
  const [mutate] = useUpdateUserProfileMutation();
  useLayoutEffect(() => {
    setUid(data?.getUserProfile?.uid ?? "");
  }, [data]);

  return (
    <SectionContainer
      title="User ID"
      subTitle="Changing your user ID can have unintended side effects."
      actions={
        <Button
          isDisabled={!uidValid || uid.length === 0}
          onClick={() =>
            mutate({
              variables: {
                input: {
                  uid,
                },
              },
            })
          }
        >
          Save
        </Button>
      }
    >
      <Skeleton width="100%" isLoaded={!loading}>
        <ValidatedInput
          onChange={(value) => setUid(value)}
          onValidate={(value) => {
            return checkUidExists(value).then((exists) => {
              const valid = validateId(value);
              setUidValid(valid && !exists);
              return !valid || exists;
            });
          }}
          helpLabel="Agity uses your user ID to associate your teams with an identity. It must be unique."
          inputProps={{
            type: "text",
            placeholder: "Your User ID",
            value: uid,
          }}
        />
      </Skeleton>
    </SectionContainer>
  );
}

export function AccountIdSettingsSection() {
  const user = useUser();

  return (
    <SectionContainer
      title="Your Agity ID"
      subTitle="This is your internal agity id."
    >
      <InputGroup size="md">
        <Input pr="4.5rem" value={user?.id} readOnly />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => console.log}>
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>
    </SectionContainer>
  );
}

export function AccountDeleteSettingsSection() {
  return (
    <SectionContainer
      title="Delete Account"
      subTitle="Once you delete your account, there is no going back. Please be certain."
      actions={
        <Button colorScheme="red" onClick={() => console.log}>
          Delete
        </Button>
      }
    />
  );
}
