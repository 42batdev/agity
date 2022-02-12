import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useLayoutEffect, useState } from "react";
import { useUser } from "../../../supabase/AuthContext";
import { useActiveUserProfileQuery } from "../../../utils/hooks/profile";
import { SectionContainer } from "./SectionContainer";

export function AccountUsernameSettingsSection() {
  const [uid, setUid] = useState("");

  const { loading, data } = useActiveUserProfileQuery();
  useLayoutEffect(() => {
    setUid(data?.getUserProfile?.uid);
  }, [data]);

  // const { mutate: mutateUsername } = useProfileUsernameMutation();

  return (
    <SectionContainer
      title="User ID"
      subTitle="Changing your user ID can have unintended side effects."
      actions={
        <Button
          onClick={() => {
            // return mutateUsername(uid);
          }}
        >
          Save
        </Button>
      }
    >
      <Input
        isDisabled={loading}
        placeholder="Your user ID"
        value={uid}
        onChange={(event) => setUid(event.target.value)}
      />
    </SectionContainer>
  );
}

export function AccountIdSettingsSection() {
  const user = useUser();

  return (
    <SectionContainer
      title="Your Agity ID"
      subTitle="This is your internal agity id.."
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
