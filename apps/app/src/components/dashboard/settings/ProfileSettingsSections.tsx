import React, { useState } from "react";
import { Avatar, Button, Input } from "@chakra-ui/react";
import { SectionContainer } from "./SectionContainer";
import {
  useProfile,
  useProfileDisplayNameMutation,
  useProfileEmailMutation,
  useSession,
} from "supabase";

export function DisplayNameSettingsSection() {
  const profile = useProfile();

  const [displayName, setDisplayName] = useState(profile.username);
  const { mutate: mutateDisplayName } = useProfileDisplayNameMutation();

  return (
    <SectionContainer
      title="Display Name"
      subTitle="Your name may appear where you contribute or are mentioned. You can change it at any time."
      actions={
        <Button onClick={() => mutateDisplayName(displayName)}>Save</Button>
      }
    >
      <Input
        placeholder="Your display name"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />
    </SectionContainer>
  );
}

export function EmailSettingsSection() {
  const session = useSession();

  const [email, setEmail] = useState(session.user.email);
  const {mutate: mutateEmail} = useProfileEmailMutation();

  return (
      <SectionContainer
          title="Email Address"
          subTitle="Please enter the email address you want to use with Agity."
          actions={<Button onClick={() => mutateEmail(email)}>Save</Button>}
      >
        <Input
            type="email"
            value={email}
            placeholder="Your email address"
            onChange={(event) => setEmail(event.target.value)}
        />
      </SectionContainer>
  );
}

export function AvatarSettingsSection() {
  return (
      <SectionContainer
          title="Avatar"
          subTitle="We strongly recommend to upload an avatar image."
          actions={<Button onClick={() => console.log}>Save</Button>}
      >
        <Avatar/>
      </SectionContainer>
  );
}
