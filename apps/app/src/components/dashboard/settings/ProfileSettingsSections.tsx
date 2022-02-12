import { Button, Input } from "@chakra-ui/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useUpdateUser, useUser } from "../../../supabase/AuthContext";
import {
  generateUniqAvatarName,
  removeAvatarFromStorage,
  uploadAvatarToStorage,
} from "../../../supabase/storage/avatar";
import { useActiveUserProfileQuery } from "../../../utils/hooks/profile";

import ProfileSettingsAvatarEditor from "./ProfileSettingsAvatarEditor";
import { SectionContainer } from "./SectionContainer";

export function DisplayNameSettingsSection() {
  const [name, setName] = useState("");

  const { loading, data } = useActiveUserProfileQuery();
  useLayoutEffect(() => {
    setName(data?.getUserProfile?.name);
  }, [data]);

  // const { mutate: mutateDisplayName } = useProfileDisplayNameMutation();

  return (
    <SectionContainer
      title="Display Name"
      subTitle="Your name may appear where you contribute or are mentioned."
      actions={
        <Button
          onClick={() => {
            // return mutateDisplayName(name);
          }}
        >
          Save
        </Button>
      }
    >
      <Input
        isDisabled={loading}
        placeholder="Your display name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </SectionContainer>
  );
}

export function EmailSettingsSection() {
  const [email, setEmail] = useState(useUser().email);
  const updateUser = useUpdateUser();

  return (
    <SectionContainer
      title="Email Address"
      subTitle="Please enter the email address you want to use with Agity."
      actions={<Button onClick={() => updateUser({ email })}>Save</Button>}
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
  const { loading, data } = useActiveUserProfileQuery();

  // const { mutate } = useProfileAvatarURLMutation();

  const editorRef = useRef<AvatarEditor>(null);

  return (
    <SectionContainer
      title="Avatar"
      subTitle="We strongly recommend to upload an avatar image."
      actions={
        <Button
          isDisabled={loading}
          onClick={() => {
            const filename = data?.getUserProfile?.avatar?.filename;

            removeAvatarFromStorage(filename, () => {
              if (Number.isNaN(editorRef?.current.getCroppingRect().height)) {
                // mutate(null);
              } else {
                const newImageName = `${generateUniqAvatarName()}.jpg`;
                editorRef?.current?.getImageScaledToCanvas().toBlob(
                  (blob) => {
                    if (blob) {
                      uploadAvatarToStorage(newImageName, blob, () => {
                        // mutate(newImageName);
                      });
                    }
                  },
                  "image/jpeg",
                  0.9
                );
              }
            });
          }}
        >
          Save
        </Button>
      }
    >
      <ProfileSettingsAvatarEditor editorRef={editorRef} />
    </SectionContainer>
  );
}
