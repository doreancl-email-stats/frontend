import "../styles/index.css";
import type { AppProps } from "next/app";
import { AppWrapper } from "../context/AppWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
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
