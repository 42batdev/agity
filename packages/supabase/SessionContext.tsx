import { Session } from "@supabase/gotrue-js/src/lib/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import supabase, { Profile, useProfileQuery } from "supabase";

interface SessionContextProps {
  children: ReactNode;
}

const SessionContext = createContext<{
  session: Session;
  profile: Profile;
}>(undefined);

function SessionContextProvider({ children }: SessionContextProps) {
  const [profile, setProfile] = useState<Profile>();
  const { data, isLoading } = useProfileQuery(supabase.auth.session().user.id);

  useEffect(() => {
    if (!isLoading && data) {
      setProfile({
        username: data.username,
        displayName: data.displayname,
        avatar: {
          url: data.avatar_url
            ? supabase.storage.from("avatars").getPublicUrl(data.avatar_url)
                .publicURL
            : undefined,
          filename: data.avatar_url,
        },
      });
    }
  }, [data, isLoading]);

  return (
    <>
      {profile && (
        <SessionContext.Provider
          value={{ session: supabase.auth.session(), profile }}
        >
          {children}
        </SessionContext.Provider>
      )}
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

export function useProfile(): Profile {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a AppProvider");
  }
  return context.profile;
}

export { SessionContextProvider };
