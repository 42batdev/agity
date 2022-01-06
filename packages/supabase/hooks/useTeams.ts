import { useMutation, useQuery, useQueryClient } from "react-query";
import supabase from "supabase";

export function useTeam(id: string) {
  return useQuery(
    ["team"],
    () =>
      supabase
        .from("teams")
        .select("id, name")
        .match({ id })
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
        .select("id, name")
        .then(handleSupabaseError)
        .then(({ data }) => data) as Promise<any>
  );
}

export function useCreateTeam() {
  const client = useQueryClient();

  return useMutation<unknown, unknown, { id: string; name: string }, unknown>(
    ["teams"],
    (variables) =>
      supabase
        .from("teams")
        .insert([
          {
            id: variables.id,
            name: variables.name,
            owner_id: supabase.auth.user().id,
          },
        ])
        .then(handleSupabaseError)
        .then(({ data }) => data) as Promise<any>,
    {
      onSuccess: (data, variables) => {
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
