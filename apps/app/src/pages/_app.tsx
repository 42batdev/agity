import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { SessionContextProvider } from "supabase/SessionContext";
import { theme } from "ui";
import { QueryClient, QueryClientProvider } from "react-query";

import "focus-visible/dist/focus-visible";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider>
        <ChakraProvider theme={theme} resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
