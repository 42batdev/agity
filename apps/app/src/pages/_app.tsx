import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { theme } from "ui";

import "focus-visible/dist/focus-visible";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import supabase from "../supabase";
import { AuthContextProvider } from "../supabase/AuthContext";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(false);
        switch (event) {
          case "SIGNED_IN":
          case "TOKEN_REFRESHED":
            fetch("/api/auth/set", {
              method: "POST",
              headers: new Headers({ "Content-Type": "application/json" }),
              credentials: "same-origin",
              body: JSON.stringify({ event, session }),
            }).then(() => router.push("/"));
            break;
          case "SIGNED_OUT":
          case "USER_DELETED":
            fetch("/api/auth/remove", {
              method: "GET",
              credentials: "same-origin",
            }).then(() => router.push("/"));
            break;
        }
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <ChakraProvider theme={theme} resetCSS>
      <ApolloProvider client={apolloClient}>
        {!loading && <Component {...pageProps} />}
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
