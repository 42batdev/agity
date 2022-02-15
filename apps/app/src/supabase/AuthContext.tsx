import { ApiError } from "@supabase/gotrue-js/src/lib/types";
import { User, UserAttributes, UserCredentials } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import supabase from "./index";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthState {
  user: User | null;
  updateUser: (
    attributes: UserAttributes
  ) => Promise<{ error: ApiError | null }>;
  signIn: (credentials: UserCredentials) => Promise<{ error: ApiError | null }>;
  signOut: () => Promise<{ error: ApiError | null }>;
}

const defaultAuthState: AuthState = {
  user: null,
  signIn: (credentials) => supabase.auth.signIn(credentials),
  signOut: () => supabase.auth.signOut(),
  updateUser: (attributes) => supabase.auth.update(attributes),
};

const AuthContext = createContext<AuthState>(defaultAuthState);

function AuthContextProvider({ children }: AuthContextProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(supabase.auth.session());
    setUser(supabase.auth.session()?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        switch (event) {
          case "SIGNED_IN":
          case "TOKEN_REFRESHED":
            fetch("/api/auth/set", {
              method: "POST",
              headers: new Headers({ "Content-Type": "application/json" }),
              credentials: "same-origin",
              body: JSON.stringify({ event, session }),
            }).then(() => router.push("/"));
            break;
          case "SIGNED_OUT":
          case "USER_DELETED":
            fetch("/api/auth/remove", {
              method: "GET",
              credentials: "same-origin",
            }).then(() => router.push("/"));
            break;
        }
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...defaultAuthState, user }}>
      {!loading && children}
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

export function useSignIn() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSignIn must be used within a AuthContext");
  }
  return context.signIn;
}

export function useSignOut() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSignOut must be used within a AuthContext");
  }
  return context.signOut;
}

export { AuthContextProvider };
