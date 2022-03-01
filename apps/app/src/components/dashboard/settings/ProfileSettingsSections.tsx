import {
  useUpdateUserProfileMutation,
  useUserProfileQuery,
} from "../../../generated/graphql";
import { useUpdateUser, useUser } from "../../../supabase/AuthContext";
import {
  generateUniqAvatarName,
  removeAvatarFromStorage,
  uploadAvatarToStorage,
} from "../../../supabase/storage/avatar";
import ProfileSettingsAvatarEditor from "./ProfileSettingsAvatarEditor";
import { SectionContainer } from "../../common/SectionContainer";
import { Button, Input, Skeleton } from "@chakra-ui/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

export function DisplayNameSettingsSection() {
  const [name, setName] = useState("");

  const { loading, data } = useUserProfileQuery();
  const [mutate] = useUpdateUserProfileMutation();
  useLayoutEffect(() => {
    setName(data?.getUserProfile?.name ?? "");
  }, [data]);

  return (
    <SectionContainer
      title="Display Name"
      subTitle="Your name may appear where you contribute or are mentioned."
      actions={
        <Button
          isDisabled={name.length === 0}
          onClick={() =>
            mutate({
              variables: {
                input: {
                  name,
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
        <Input
          isDisabled={loading}
          placeholder="Your display name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Skeleton>
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
  const user = useUser();

  const { loading, data } = useUserProfileQuery();
  const [mutate] = useUpdateUserProfileMutation();

  const editorRef = useRef<AvatarEditor>(null);

  return (
    <SectionContainer
      title="Avatar"
      subTitle="We strongly recommend to upload an avatar image."
      actions={
        <Button
          isDisabled={loading}
          onClick={() => {
            const currentFilename = data?.getUserProfile?.avatar?.filename;

            removeAvatarFromStorage(currentFilename, () => {
              if (Number.isNaN(editorRef?.current?.getCroppingRect().height)) {
                mutate({
                  variables: {
                    input: {
                      avatar: { filename: null },
                    },
                  },
                });
              } else {
                const filename = `${generateUniqAvatarName()}.jpg`;
                editorRef?.current?.getImageScaledToCanvas().toBlob(
                  (blob) => {
                    if (blob) {
                      uploadAvatarToStorage(filename, blob, () => {
                        mutate({
                          variables: {
                            input: {
                              avatar: { filename },
                            },
                          },
                        });
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
