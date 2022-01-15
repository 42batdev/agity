import { Session } from "@supabase/gotrue-js/src/lib/types";
import { createContext, ReactNode, useContext } from "react";
import supabase from "supabase";

export type Profile = {
  username: string;
  displayName?: string;
  avatar: {
    url?: string;
    filename?: string;
  };
};

interface SessionContextProps {
  profile: Profile;
  children: ReactNode;
}

const SessionContext = createContext<{
  session: Session;
  profile: Profile;
}>(undefined);

function SessionContextProvider({ profile, children }: SessionContextProps) {
  return (
    <SessionContext.Provider
      value={{ session: supabase.auth.session(), profile }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): Session {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a AppProvider");
  }
  return context.session;
}

export function useProfile(): Profile {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a AppProvider");
  }
  return context.profile;
}

export { SessionContextProvider };
