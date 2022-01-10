import { Session } from "@supabase/gotrue-js/src/lib/types";
import * as React from "react";
import { ReactNode, useState } from "react";
import supabase from "supabase";
import { useRouter } from "next/router";

interface IContextProps {
  session: Session | null;
}

const SessionContext = React.createContext({} as IContextProps);

function SessionContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  );

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event);
    switch (event) {
      case "SIGNED_IN":
      case "TOKEN_REFRESHED":
        setSession(supabase.auth.session());
        fetch("/api/auth/set", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then(() => router.push("/dashboard"));
        break;
      case "SIGNED_OUT":
      case "USER_DELETED":
        setSession(null);
        fetch("/api/auth/remove", {
          method: "GET",
          credentials: "same-origin",
        }).then(() => router.push("/"));
        break;
    }
  });

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = React.useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a AppProvider");
  }
  return context.session;
}

export { SessionContextProvider };
