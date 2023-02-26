import React from "react";
import { PUBLIC_BUGSNAG_APIKEY } from "../../config";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

type Props = {
  children: React.ReactNode;
};

export default function ErrorBoundary({ children }: Props) {
  console.log("-------Layout----------");

  if (PUBLIC_BUGSNAG_APIKEY) {
    Bugsnag.start({
      apiKey: PUBLIC_BUGSNAG_APIKEY,
      plugins: [new BugsnagPluginReact()],
    });

    const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

    return <ErrorBoundary>{children}</ErrorBoundary>;
  } else {
    return <> {children} </>;
  }
}
