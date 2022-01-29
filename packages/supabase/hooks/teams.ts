import { useMutation, useQuery, useQueryClient } from "react-query";
import supabase, { useSession } from "supabase";

export function useTeam(tid: string) {
  return useQuery(
    ["team"],
    () =>
      supabase
        .from("teams")
        .select("id, tid, name")
        .match({ tid })
        .then(handleSupabaseError)
        .then(({ data }) => data[0]) as Promise<any>
  );
}

export function useTeams() {
  return useQuery(
    ["teams"],
    () =>
      supabase
        .from("teams")
        .select("id, tid, name")
        .then(handleSupabaseError)
        .then(({ data }) => data) as Promise<any>
  );
}

export function useCreateTeam() {
  const client = useQueryClient();
  const { user } = useSession();

  return useMutation<unknown, unknown, { tid: string; name: string }, unknown>(
    ["teams"],
    ({ tid, name }) =>
      supabase
        .rpc("add_team", {
          tid,
          name,
          user_id: user.id,
        })
        .then(handleSupabaseError)
        .then(({ data }) => data) as Promise<any>,
    {
      onSuccess: () => {
        client.invalidateQueries(["teams"]);
      },
    }
  );
}

export function useDeleteTeam() {
  const client = useQueryClient();

  return useMutation<unknown, unknown, { id: string }, unknown>(
    ["teams"],
    (variables) =>
      supabase
        .from("teams")
        .delete()
        .match({ id: variables.id })
        .then(handleSupabaseError)
        .then(({ data }) => data) as Promise<any>,
    {
      onSuccess: (data, variables) => {
        client.invalidateQueries(["teams"]);
      },
    }
  );
}

function handleSupabaseError({ error, ...rest }) {
  if (error) {
    throw error;
  }
  return rest;
}
