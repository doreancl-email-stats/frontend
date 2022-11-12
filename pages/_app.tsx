import "../styles/index.css";
import type { AppProps } from "next/app";
import { AppWrapper } from "../context/AppWrapper";
import { SWRConfig } from "swr";
import React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { BUGSNAG_APIKEY } from "../config";

function MyApp({ Component, pageProps }: AppProps) {
  Bugsnag.start({
    apiKey: BUGSNAG_APIKEY,
    plugins: [new BugsnagPluginReact()],
  });

  const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

  return (
    <ErrorBoundary>
      <AppWrapper>
        <SWRConfig
          value={{
            revalidateIfStale: false,
            errorRetryCount: 1,
            refreshInterval: 999999,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>

        <style jsx global>{`
          /* Other global styles such as 'html, body' etc... */

          #__next {
            height: 100%;
          }
        `}</style>
      </AppWrapper>
    </ErrorBoundary>

    /*  <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              console.error('MyApp', 14, err);
            },
          }}
        >
          {/!* <RouteGuard>
            <p>with routeguard</p>
          </RouteGuard> *!/}
        </SWRConfig> */
  );
}

export default MyApp;
