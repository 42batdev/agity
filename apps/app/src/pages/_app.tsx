import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { theme } from "ui";
import { QueryClient, QueryClientProvider } from "react-query";

import "focus-visible/dist/focus-visible";
import dynamic from "next/dynamic";
import supabase from "supabase";
import { useRouter } from "next/router";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useSupabaseAuthHandler();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
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
        }).then(() => router.push("/dashboard"));
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
