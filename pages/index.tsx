import type { GetServerSideProps } from "next";
import { useAppContext } from "../context/AppWrapper";
import React, { useEffect, useState } from "react";
import { APP_STATE } from "../context/AppReducer";
import { getSimpleSession } from "../lib/hooks-users";
import Layout from "../components/newLayout/layout";
import { validateCookie } from "../context/utils/cookie";

const Index = ({ timestampCurrent, timestampPrevious }) => {
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
        //const [session, error] = await getSession({});
        //setSession(session);
        const [session, error] = await getSimpleSession();
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

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  const cookie = context.req.headers.cookie;
  const { user, message } = validateCookie(cookie);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      timestampCurrent,
      timestampPrevious,
    },
  };
};
