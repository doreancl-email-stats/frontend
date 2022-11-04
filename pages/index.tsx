import type { GetServerSideProps } from "next";
import Layout from "../components/newLayout/layout";
import { useAppContext } from "../context/AppWrapper";
import React, { useEffect, useState } from "react";
import { getSession } from "../lib/hooks-users";
import { APP_STATE } from "../context/AppReducer";

const Index = ({ timestampCurrent, timestampPrevious }) => {
  console.log("Index");
  const [state, dispatch] = useAppContext();
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log("set_timestamps ????", timestampCurrent, timestampPrevious);

    dispatch({
      type: "set_timestamps",
      value: { current: timestampCurrent, previous: timestampPrevious },
    });
  }, [timestampCurrent, timestampPrevious, dispatch]);

  useEffect(() => {
    if (state.app_state == APP_STATE.READY) {
      //return window.location.assign("https://sites.google.com/view/emailstats/");
      (async () => {
        const [session, error] = await getSession({});
        setSession(session);
      })();
    }
  }, [state]);

  useEffect(() => {
    console.log("REDIRECT ????", state);
    if (
      state.app_state == APP_STATE.READY &&
      null != session &&
      !session?.profile
    ) {
      console.log("REDIRECT", session);
      //return window.location.assign("https://sites.google.com/view/emailstats/");
    }
  }, [state, session]);

  return <>{state.app_state == APP_STATE.READY && <Layout />}</>;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  const today = new Date();

  const timestampCurrent = {
    from: new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    ).getTime(),
    to: today.getTime(),
  };
  const timestampPrevious = {
    from: new Date(
      today.getFullYear(),
      today.getMonth() - 2,
      today.getDate()
    ).getTime(),
    to: new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    ).getTime(),
  };

  return {
    props: {
      timestampCurrent,
      timestampPrevious,
    },
  };
};
