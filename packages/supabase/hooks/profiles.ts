import { useMutation, useQuery, useQueryClient } from "react-query";
import supabase, { useSession } from "supabase";

export function useProfileQuery(id?: string) {
  const session = useSession();

  return useQuery(["profile"], () => {
    return supabase
      .from("profiles")
      .select("id, username")
      .match({ id: id ?? session.user.id })
      .then(handleSupabaseError)
      .then(({ data }) => data[0]) as Promise<any>;
  });
}

export function useProfileDisplayNameMutation() {
  const queryClient = useQueryClient();
  const id = useSession()?.user.id;

  return useMutation(
    ["profile"],
    (displayname: string) => {
      return supabase
        .from("profiles")
        .update({ id, displayname })
        .then(handleSupabaseError)
        .then(({ data }) => data[0]) as Promise<any>;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );
}

export function useProfileUsernameMutation() {
  const queryClient = useQueryClient();
  const id = useSession()?.user.id;

  return useMutation(
    ["profile"],
    (username: string) => {
      return supabase
        .from("profiles")
        .update({ id, username })
        .then(handleSupabaseError)
        .then(({ data }) => data[0]) as Promise<any>;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );
}

export function useProfileAvatarURLMutation() {
  const queryClient = useQueryClient();
  const id = useSession()?.user.id;

  return useMutation(
    ["profile"],
    (avatar_url: string) => {
      return supabase
        .from("profiles")
        .update({ id, avatar_url })
        .then(handleSupabaseError)
        .then(({ data }) => data[0]) as Promise<any>;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );
}

export function useProfileEmailMutation() {
  const queryClient = useQueryClient();
  const id = useSession()?.user.id;

  return useMutation(
    ["profile"],
    (email: string) => {
      return supabase.auth.update({ email });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
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
