import { Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import supabase from "supabase";

const Redirect = () => {
  const router = useRouter();

  supabase.auth.onAuthStateChange((event, session) => {
    fetch("/api/auth/set", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    }).then(() => router.push("/teams"));
  });

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
