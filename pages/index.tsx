import type { GetServerSideProps } from "next";
import Layout from "../components/newLayout/layout";
import { useAppContext } from "../context/AppWrapper";
import React, { useEffect } from "react";
import { getSession } from "../lib/hooks-users";
import { APP_STATE } from "../context/AppReducer";

const Index = ({ session, timestampCurrent, timestampPrevious }) => {
  console.log("Index");
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({
      type: "set_timestamps",
      value: { current: timestampCurrent, previous: timestampPrevious },
    });
  }, [timestampCurrent, timestampPrevious]);

  useEffect(() => {
    console.log("REDIRECT ????");
    if (state.app_state == APP_STATE.READY && !session?.user) {
      console.log("REDIRECT");
      //return window.location.assign("https://sites.google.com/view/emailstats/");
    }
  }, [state, session]);

  return <>{state.app_state == APP_STATE.READY && <Layout />}</>;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  const [session, error] = await getSession({});
  console.log("getServerSideProps");
  console.log({ session, error });

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
      session,
      timestampCurrent,
      timestampPrevious,
    },
  };
};
