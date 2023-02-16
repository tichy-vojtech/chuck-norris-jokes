import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import { AppLayout } from "../components/AppLayout";
import { cnJokesTheme } from "../theme";

export type MyAppProps = {
  Component: React.ComponentType;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <ChakraProvider theme={cnJokesTheme}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <title>Chuck Norris Jokes</title>
        </Head>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ChakraProvider>
    </>
  );
}
