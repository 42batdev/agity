import supabase from "../../supabase";
import { User } from "@supabase/supabase-js";
import { GetServerSidePropsResult } from "next";

export interface AppServerSideProps {
  user: User;
}

export const initAppProps = async (
  context
): Promise<GetServerSidePropsResult<AppServerSideProps>> => {
  const session = await initSupabaseSSRSession(context);

  if (!session || !session.user || session.error) {
    console.log(
      "Authorization error or no auth user redirecting to login page",
      session.error
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

export interface TeamServerSideProps {
  id: string;
  uid: string;
  tid: string;
}

export const initUProps = async (
  context
): Promise<GetServerSidePropsResult<TeamServerSideProps>> => {
  await initSupabaseSSRSession(context);

  const { uid, tid } = context.query;

  if (uid && tid) {
    const exists = await supabase
      .from("teams")
      .select("id", { count: "exact" })
      .match({ tid, uid });

    if ((exists.count ?? 0 > 0) && exists.data) {
      return {
        props: {
          id: exists.data[0].id,
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

async function initSupabaseSSRSession(context) {
  const session = await supabase.auth.api.getUserByCookie(
    context.req,
    context.res
  );
  if (session.token) {
    supabase.auth.setAuth(session.token);
    return session;
  } else {
    throw Error;
  }
}
