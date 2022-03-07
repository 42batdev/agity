import supabase from "../../supabase";
import { User } from "@supabase/supabase-js";
import { GetServerSidePropsResult } from "next";

export interface AppServerSideProps {
  user: User;
}

export const initSupabaseProps = async (
  context
): Promise<GetServerSidePropsResult<AppServerSideProps>> => {
  const session = await initSupabaseSSRSession(context);

  if (!session || !session.user || session.error) {
    console.log(
      "Authorization error or no auth user redirecting to login page",
      session?.error
    );
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};

async function initSupabaseSSRSession(context) {
  const session = await supabase.auth.api.getUserByCookie(
    context.req,
    context.res
  );
  if (session.token) {
    supabase.auth.setAuth(session.token);
    return session;
  }

  return undefined;
}

export interface TeamServerSideProps {
  id: string;
  uid: string;
  tid: string;
}

export const initTeamProps = async (
  context
): Promise<GetServerSidePropsResult<TeamServerSideProps>> => {
  const { uid, tid, id } = context.query;

  if (uid && tid && id) {
    const queryResult = await supabase
      .from("teams")
      .select("id", { count: "exact" })
      .match({ tid, uid });

    if (
      (queryResult.count ?? 0 > 0) &&
      queryResult.data &&
      id === queryResult.data[0].id
    ) {
      return {
        props: {
          id,
          uid,
          tid,
        },
      };
    }
  }

  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
};
