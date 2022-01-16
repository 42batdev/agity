import React, { useRef, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { SectionContainer } from "./SectionContainer";
import supabase, {
  useProfile,
  useProfileAvatarURLMutation,
  useProfileDisplayNameMutation,
  useProfileEmailMutation,
  useSession,
} from "supabase";
import ProfileSettingsAvatarEditor from "./ProfileSettingsAvatarEditor";
import AvatarEditor from "react-avatar-editor";

export function DisplayNameSettingsSection() {
  const profile = useProfile();

  const [displayName, setDisplayName] = useState(profile.displayName);
  const { mutate: mutateDisplayName } = useProfileDisplayNameMutation();

  return (
    <SectionContainer
      title="Display Name"
      subTitle="Your name may appear where you contribute or are mentioned."
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
  const { mutate: mutateEmail } = useProfileEmailMutation();

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
  const { username, avatar } = useProfile();
  const { mutate } = useProfileAvatarURLMutation();
  const editorRef = useRef<AvatarEditor>(null);

  return (
    <SectionContainer
      title="Avatar"
      subTitle="We strongly recommend to upload an avatar image."
      actions={
        <Button
          onClick={() => {
            if (Number.isNaN(editorRef?.current.getCroppingRect().height)) {
              supabase.storage
                .from("avatars")
                .remove([`${username}.jpg`])
                .then((result) => {
                  if (!result.error && result.data) {
                    mutate(null);
                  } else {
                    console.error(result);
                  }
                });
            } else {
              editorRef?.current?.getImageScaledToCanvas().toBlob(
                (blob) => {
                  console.log(blob);
                  if (blob) {
                    supabase.storage
                      .from("avatars")
                      .upload(`${username}.jpg`, blob, { upsert: true })
                      .then((result) => {
                        if (!result.error && result.data) {
                          mutate(`${username}.jpg`);
                        } else {
                          console.error(result);
                        }
                      });
                  }
                },
                "image/jpeg",
                0.9
              );
            }
          }}
        >
          Save
        </Button>
      }
    >
      <ProfileSettingsAvatarEditor
        editorRef={editorRef}
        avatarURL={avatar.filename}
      />
    </SectionContainer>
  );
}
