import { GetServerSidePropsResult } from "next";
import supabase from "../../supabase";
import { User } from "@supabase/supabase-js";

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
