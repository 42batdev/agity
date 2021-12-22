import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { SessionContextProvider } from "supabase/SessionContext";
import { theme } from "ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider>
      <ChakraProvider theme={theme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
