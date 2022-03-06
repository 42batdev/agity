import { useUpdateTeamMutation } from "../../../generated/graphql";
import { validateId } from "../../../server/graphql/errors";
import { checkTidExists } from "../../../supabase/utils";
import { SectionContainer } from "../../common/SectionContainer";
import ValidatedInput from "../../common/ValidateInput";
import { useUid } from "../TeamNavigationContext";
import { useTeam } from "../useTeam";
import { Button, Input, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";

export function TeamNameSettingsSection() {
  const [name, setName] = useState("");

  const { loading, data } = useTeam();
  useLayoutEffect(() => {
    setName(data?.getTeam?.name ?? "");
  }, [data]);

  const [mutate] = useUpdateTeamMutation();

  return (
    <SectionContainer
      title="Display Name"
      subTitle="The team name is visible for all team members."
      actions={
        <Button
          isDisabled={name.length === 0}
          onClick={() => {
            if (data?.getTeam) {
              mutate({ variables: { input: { id: data?.getTeam.id, name } } });
            }
          }}
        >
          Save
        </Button>
      }
    >
      <Skeleton width="100%" isLoaded={!loading}>
        <Input
          type="text"
          isDisabled={loading}
          placeholder="Your display name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Skeleton>
    </SectionContainer>
  );
}

export function TeamIdSettingsSection() {
  const uid = useUid();
  const router = useRouter();

  const [tid, setTid] = useState("");
  const [tidValid, setTidValid] = useState(true);

  const { loading, data } = useTeam();
  useLayoutEffect(() => {
    setTid(data?.getTeam?.tid ?? "");
    setTidValid(false);
  }, [data]);

  const [mutate] = useUpdateTeamMutation();

  return (
    <SectionContainer
      title="Team ID"
      subTitle="Changing your teams ID can have unintended side effects."
      actions={
        <Button
          isDisabled={!tidValid || tid.length === 0}
          onClick={() => {
            if (data?.getTeam && tidValid) {
              mutate({
                variables: { input: { id: data?.getTeam.id, tid } },
              }).then(() => {
                router.push(`/u/${uid}/${tid}/settings`);
              });
            }
          }}
        >
          Save
        </Button>
      }
    >
      <Skeleton width="100%" isLoaded={!loading}>
        <ValidatedInput
          onChange={(value) => setTid(value)}
          onValidate={(value) => {
            return checkTidExists(value).then((exists) => {
              const valid = validateId(value);
              setTidValid(valid && !exists);
              return !valid || exists;
            });
          }}
          helpLabel="Agity uses the team ID to identity the team and create URLs. It must be unique."
          inputProps={{
            type: "text",
            placeholder: "Team ID",
            value: tid,
          }}
        />
      </Skeleton>
    </SectionContainer>
  );
}

export function TeamDeleteSettingsSection() {
  return (
    <SectionContainer
      title="Delete Team"
      subTitle="Once you delete your team, there is no going back. Please be certain."
      actions={
        <Button colorScheme="red" onClick={() => console.log}>
          Delete
        </Button>
      }
    />
  );
}
