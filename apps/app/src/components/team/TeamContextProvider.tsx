import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Team, useTeamQuery } from "supabase";

interface TeamContextProps {
  tid: string;
  children: ReactNode;
}

const TeamContext = createContext<{
  team: Team;
}>(undefined);

function TeamContextProvider({ tid, children }: TeamContextProps) {
  const [team, setTeam] = useState<Team>(undefined);
  const { data, isLoading } = useTeamQuery(tid);

  useEffect(() => {
    if (!isLoading && data) {
      setTeam({
        id: data.id,
        tid: data.tid,
        name: data.name,
      });
    }
  }, [data, isLoading]);

  return (
    <>
      {team && (
        <TeamContext.Provider value={{ team }}>{children}</TeamContext.Provider>
      )}
    </>
  );
}

export function useTeam(): Team {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a AppProvider");
  }
  return context.team;
}

export { TeamContextProvider };
