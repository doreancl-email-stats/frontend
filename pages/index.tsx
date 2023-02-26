import type { GetServerSideProps } from "next";
import { useAppContext } from "../context/AppWrapper";
import React, { useEffect, useState } from "react";
import Layout from "../components/newLayout/layout";
import { validateCookie } from "../context/utils/cookie";
import packageInfo from "../package.json";

const Index = ({ timestamps }) => {
  const [state, dispatch] = useAppContext();
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log("nameAndVersion", packageInfo.name, packageInfo.version);

    dispatch({
      type: "set_timestamps",
      value: { current: timestamps.current, previous: timestamps.previous },
    });
  }, [timestamps, dispatch]);

  return (
    <>
      <Layout timestamps={timestamps} />
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const today = new Date();

  console.log("---------Index-----------");
  console.log("nameAndVersion", packageInfo.name, packageInfo.version);

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

  const timestamps = {
    previous: timestampCurrent,
    current: timestampPrevious,
  };

  const cookie = context.req.headers.cookie;
  const { user, message } = validateCookie(cookie);
  console.log("validateCookie", { profile: user?.profile._json, message });

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
      timestamps,
    },
  };
};
