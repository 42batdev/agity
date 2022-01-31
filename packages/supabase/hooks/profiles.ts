import { useMutation, useQuery, useQueryClient } from "react-query";
import supabase, { useSession } from "supabase";

export type Profile = {
  uid: string;
  name?: string;
  avatar: {
    url?: string;
    filename?: string;
  };
};

export function useProfileQuery(id: string) {
  return useQuery(["profile", id], () => {
    return supabase
      .from("profiles")
      .select("id, uid, name, avatar_url")
      .match({ id })
      .then(handleSupabaseError)
      .then(({ data }) => data[0]) as Promise<any>;
  });
}

export function useProfileDisplayNameMutation() {
  const queryClient = useQueryClient();
  const id = useSession()?.user.id;

  return useMutation(
    ["profile"],
    (name: string) => {
      return supabase
        .from("profiles")
        .update({ id, name })
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
    (uid: string) => {
      return supabase
        .from("profiles")
        .update({ id, uid })
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
    (avatar_url: string | null) => {
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
