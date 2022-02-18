import supabase from "./index";
import { ApiError } from "@supabase/gotrue-js/src/lib/types";
import {
  Session,
  User,
  UserAttributes,
  UserCredentials,
} from "@supabase/supabase-js";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  sessionUser: User;
  children: ReactNode;
}

interface AuthState {
  user: User;
  updateUser: (
    attributes: UserAttributes
  ) => Promise<{ error: ApiError | null }>;
  signOut: () => Promise<{ error: ApiError | null }>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

function AuthContextProvider({ sessionUser, children }: AuthContextProps) {
  const router = useRouter();

  const [user] = useState<User>(sessionUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser: (attributes) => supabase.auth.update(attributes),
        signOut: () => supabase.auth.signOut(),
      }}
    >
      {user && children}
    </AuthContext.Provider>
  );
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
