import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { theme } from "ui";

import "focus-visible/dist/focus-visible";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import {AuthContextProvider} from "../supabase/AuthContext";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
