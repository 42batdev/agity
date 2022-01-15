import { GetServerSidePropsResult } from "next";
import supabase, { Profile } from "supabase";

export interface AgityAppServerSideProps {
  profile: Profile;
}

export const initAppDashboardProps = async (
  context
): Promise<GetServerSidePropsResult<AgityAppServerSideProps>> => {
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
  } else {
    const profileResult = await supabase
      .from("profiles")
      .select("id, username, displayname, avatar_url")
      .match({ id: authResult.user.id });
    supabase.storage
      .updateBucket("avatars", { public: true })
      .then(console.log);
    const profile: Profile = {
      username: profileResult.data[0].username,
      displayName: profileResult.data[0].displayname,
      avatar: {
        url: supabase.storage
          .from("avatars")
          .getPublicUrl(profileResult.data[0].avatar_url).publicURL,
        filename: profileResult.data[0].avatar_url,
      },
    };
    return {
      props: {
        profile,
      },
    };
  }
};
