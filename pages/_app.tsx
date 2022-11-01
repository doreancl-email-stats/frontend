import "../styles/index.css";
import type { AppProps } from "next/app";
import { AppWrapper } from "../context/AppWrapper";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
