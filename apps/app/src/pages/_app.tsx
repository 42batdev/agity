import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { theme } from "ui";

import "focus-visible/dist/focus-visible";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NextPage } from "next";
import supabase from "../supabase";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useSupabaseAuthHandler();

  return (
      <ChakraProvider theme={theme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
  );
}

function useSupabaseAuthHandler() {
  const router = useRouter();

  supabase.auth.onAuthStateChange((event, session) => {
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
  });
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
