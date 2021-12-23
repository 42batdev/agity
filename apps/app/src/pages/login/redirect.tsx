import { Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SessionContextProvider, useSession } from "supabase";

const Redirect = () => {
  return (
    <SessionContextProvider>
      <RedirectWithSession />
    </SessionContextProvider>
  );
};

const RedirectWithSession = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    router.push("/teams");
  }, [router, session]);

  return (
    <>
      <Head>
        <title>Redirecting ...</title>
      </Head>
      <Text>Redirecting ...</Text>
    </>
  );
};

export default Redirect;
