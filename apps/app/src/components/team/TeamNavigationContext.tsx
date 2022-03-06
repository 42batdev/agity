import { TeamServerSideProps } from "../../server/ssr/props";
import { createContext, ReactNode, useContext } from "react";

interface TeamNavigationContextProps extends TeamServerSideProps {
  children: ReactNode;
}

const TeamNavigationContext = createContext<TeamServerSideProps | undefined>(
  undefined
);

function TeamNavigationContextProvider(props: TeamNavigationContextProps) {
  return (
    <TeamNavigationContext.Provider value={props}>
      {props.children}
    </TeamNavigationContext.Provider>
  );
}

export function useTeamId() {
  const context = useContext(TeamNavigationContext);
  if (context === undefined) {
    throw new Error("useUid must be used within a TeamNavigationContext");
  }
  return context.id;
}

export function useUid() {
  const context = useContext(TeamNavigationContext);
  if (context === undefined) {
    throw new Error("useUid must be used within a TeamNavigationContext");
  }
  return context.uid;
}

export function useTid() {
  const context = useContext(TeamNavigationContext);
  if (context === undefined) {
    throw new Error("useTid must be used within a TeamNavigationContext");
  }
  return context.tid;
}

export { TeamNavigationContextProvider };
