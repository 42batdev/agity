import { AuthChangeEvent } from "@supabase/gotrue-js";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import * as React from "react";
import { ReactNode, useState } from "react";
import supabase from "supabase";

interface IContextProps {
  session: Session | null;
}

const SessionContext = React.createContext({} as IContextProps);

function SessionContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  React.useEffect(() => {
    setSession(supabase.auth.session());
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

async function handleAuthChange(
  event: AuthChangeEvent,
  session: Session | null
) {
  await fetch("/api/auth/set", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
}

export function useSession() {
  const context = React.useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a AppProvider");
  }
  return context.session;
}

export { SessionContextProvider };
