import { GetServerSidePropsResult } from "next";
import supabase from "../../supabase";

export interface DashboardServerSideProps {}

export const initAppProps = async (
  context
): Promise<GetServerSidePropsResult<DashboardServerSideProps>> => {
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
    props: {},
  };
};