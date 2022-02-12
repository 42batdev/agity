import {User, UserCredentials} from "@supabase/supabase-js";
import {useRouter} from "next/router";
import {createContext, ReactNode, useEffect, useState,} from "react";
import supabase from "./index";

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext<{
  signIn: (credentials: UserCredentials) => void,
  signOut: () => void,
  user: User,
}>(undefined);

function AuthContextProvider({ children }: AuthContextProps) {
  const router = useRouter();

  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = supabase.auth.session()

    setUser(session?.user ?? null)
    setLoading(false)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
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
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn: (credentials) => supabase.auth.signIn(credentials),
      signOut: () => supabase.auth.signOut(),
      user,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
