import Head from "next/head";
import React, { ReactNode } from "react";
import { Page, PageContent, PageHeader } from "ui";
import supabase, { Profile, SessionContextProvider } from "supabase";

export interface AgityAppServerSideProps {
  profile: Profile;
}

export interface AgityAppLayoutProps extends AgityAppServerSideProps {
  title: string;
  children: ReactNode;
}

export const AgityAppLayout = ({
  title,
  profile,
  children,
}: AgityAppLayoutProps) => {
  return (
    <SessionContextProvider profile={profile}>
      <Page>
        <Head>
          <title>Agity Dashboard</title>
        </Head>
        <PageHeader
          links={[
            { title: "Overview", href: "/dashboard" },
            { title: "Settings", href: "/dashboard/settings" },
          ]}
        />
        <PageContent>{children}</PageContent>
      </Page>
    </SessionContextProvider>
  );
};

export const withProfile = () => async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  const profile = await supabase
    .from("profiles")
    .select("id, username, displayname")
    .match({ id: user.id });

  return {
    props: {
      profile: {
        username: profile.data[0].username,
        displayname: profile.data[0].displayname,
      },
    }, // will be passed to the page component as props
  };
};

export const withProfile123 = () => async (context) => {
  const { username } = context.query;
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  const profileData = await supabase
    .from("profiles")
    .select("id, username, displayname")
    .match({ id: user.id });
  const profile: Profile = {
    username: profileData.data[0].username,
    displayname: profileData.data[0].displayname,
  };

  console.log(profile);
  console.log(username);
  if (profile.username !== username) {
    return {
      redirect: {
        destination: `/${profile.username}/dashboard`,
        permanent: false,
      },
      props: {},
    };
  } else {
    return { props: { profile, username } };
  }
};

export const withAuth = (next: (context) => void) => async (context) => {
  const authResult = await supabase.auth.api.getUserByCookie(context.req);
  if (authResult.error || !authResult.user) {
    console.log(
      "Authorization error or no auth user redirecting to login page",
      authResult.error
    );
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
      props: {},
    };
  } else {
    console.log("AUTH OKAY");
    return next(context);
  }
};
