import supabase from "../../supabase";
import { User } from "@supabase/supabase-js";
import { GetServerSidePropsResult } from "next";

export interface AppServerSideProps {
  user: User;
}

export const initAppProps = async (
  context
): Promise<GetServerSidePropsResult<AppServerSideProps>> => {
  const authResult = await supabase.auth.api.getUserByCookie(context.req);

  if (!authResult || !authResult.user || authResult.error) {
    console.log(
      "Authorization error or no auth user redirecting to login page",
      authResult.error
    );
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: { user: authResult.user },
  };
};

export interface TeamServerSideProps {
  uid: string;
  tid: string;
}

export const initUProps = async (
  context
): Promise<GetServerSidePropsResult<TeamServerSideProps>> => {
  const { uid, tid } = context.query;
  if (!uid || !tid) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      uid,
      tid,
    },
  };
};
