import React from "react";
import { BUGSNAG_APIKEY } from "../../config";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

type Props = {
  children: React.ReactNode;
};

export default function ErrorBoundary({ children }: Props) {
  console.log("-------Layout----------");

  if (BUGSNAG_APIKEY) {
    Bugsnag.start({
      apiKey: BUGSNAG_APIKEY,
      plugins: [new BugsnagPluginReact()],
    });

    const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

    return <ErrorBoundary>{children}</ErrorBoundary>;
  } else {
    return <> {children} </>;
  }
}
