import React, { useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SectionContainer } from "./SectionContainer";
import { useSession } from "supabase";

export function AccountUsernameSettingsSection() {
  const [displayName, setDisplayName] = useState("");

  return (
    <SectionContainer
      title="Username"
      subTitle="Changing your username can have unintended side effects."
      actions={<Button onClick={() => console.log()}>Save</Button>}
    >
      <Input
        placeholder="Your username"
        value={displayName}
        onChange={(event) => console.log(event.target.value)}
      />
    </SectionContainer>
  );
}

export function AccountIdSettingsSection() {
  const session = useSession();

  return (
    <SectionContainer
      title="Your Agity ID"
      subTitle="We strongly recommend to upload an avatar image."
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
  const session = useSession();

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
