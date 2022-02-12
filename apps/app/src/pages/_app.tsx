import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { theme } from "ui";

import "focus-visible/dist/focus-visible";
import dynamic from "next/dynamic";
import { NextPage } from "next";
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
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthContextProvider>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
