import { GetServerSidePropsResult } from "next";
import supabase, { Profile } from "supabase";
import { User } from "@supabase/supabase-js";

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

    const profile = await createProfile(authResult.user)
    if (profile) {
      return {
        props: {
          profile
        },
      };
    } else {
      return {
        redirect: {
          destination: `/404`,
          permanent: false,
        },
      };
    }
  }
};

async function createProfile(user: User): Promise<Profile | null> {
  const profileResult = await supabase
      .from("profiles")
      .select("id, username, displayname, avatar_url")
      .match({id: user.id});

  supabase.storage.updateBucket("avatars", {public: true}).then(console.log);

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

  return profile;
}
