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
import { TeamServerSideProps } from "../../../server/ssr/props";

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
