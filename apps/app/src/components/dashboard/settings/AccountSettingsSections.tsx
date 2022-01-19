import React, { useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SectionContainer } from "./SectionContainer";
import { useProfile, useProfileUsernameMutation, useSession } from "supabase";

export function AccountUsernameSettingsSection() {
  const profile = useProfile();
  const session = useSession();

  const [username, setUsername] = useState(profile.username);
  const { mutate: mutateUsername } = useProfileUsernameMutation();

  return (
    <SectionContainer
      title="Username"
      subTitle="Changing your username can have unintended side effects."
      actions={<Button onClick={() => mutateUsername(username)}>Save</Button>}
    >
      <Input
        placeholder="Your username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
    </SectionContainer>
  );
}

export function AccountIdSettingsSection() {
  const session = useSession();

  return (
    <SectionContainer
      title="Your Agity ID"
      subTitle="This is your internal agity id.."
    >
      <InputGroup size="md">
        <Input pr="4.5rem" value={session?.user.id} readOnly />
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
