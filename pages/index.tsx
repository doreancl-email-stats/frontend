import type { GetServerSideProps } from "next";
import Layout from "../components/newLayout/layout";
import { useAppContext } from "../context/AppWrapper";
import { useEffect } from "react";

const Index = ({ timestampCurrent, timestampPrevious }) => {
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({
      type: "set_timestamps",
      value: { current: timestampCurrent, previous: timestampPrevious },
    });
  }, [timestampCurrent, timestampPrevious]);

  return <Layout />;
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
