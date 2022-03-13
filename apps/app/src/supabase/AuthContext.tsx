import { ApiError } from "@supabase/gotrue-js/src/lib/types";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { SupabaseClient, User, UserAttributes } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
  sessionUser: User;
  children: ReactNode;
}

interface AuthState {
  supabase: SupabaseClient;
  user: User;
  updateUser: (
    attributes: UserAttributes
  ) => Promise<{ error: ApiError | null }>;
  signOut: () => Promise<{ error: ApiError | null }>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

function AuthContextProvider({ sessionUser, children }: AuthContextProps) {
  const [user] = useState<User>(sessionUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        supabase: supabaseClient,
        updateUser: (attributes) => supabaseClient.auth.update(attributes),
        signOut: () => supabaseClient.auth.signOut(),
      }}
    >
      {user && children}
    </AuthContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a AuthContext");
  }
  return context.supabase;
}

export function useUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a AuthContext");
  }
  return context.user;
}

export function useUpdateUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUpdateUser must be used within a AuthContext");
  }
  return context.updateUser;
}

export function useSignOut() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSignOut must be used within a AuthContext");
  }
  return context.signOut;
}

export { AuthContextProvider };
