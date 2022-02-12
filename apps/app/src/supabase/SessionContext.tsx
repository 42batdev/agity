import { Session } from "@supabase/gotrue-js/src/lib/types";
import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import supabase from "./index";

interface SessionContextProps {
  children: ReactNode;
}

const SessionContext = createContext<{
  session: Session;
}>(undefined);

function SessionContextProvider({ children }: SessionContextProps) {
  return (
    <>
        <SessionContext.Provider
          value={{ session: supabase.auth.session() }}
        >
          {children}
        </SessionContext.Provider>
    </>
  );
}

export function useSession(): Session {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a AppProvider");
  }
  return context.session;
}

export { SessionContextProvider };
