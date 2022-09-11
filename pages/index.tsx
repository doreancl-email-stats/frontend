import type { GetServerSideProps } from "next";
import useGetSession from "../lib/hooks-users";
import Layout from "../components/newLayout/layout";

const Index = () => {
  const [session, error] = useGetSession({});

  return (
    <>
      <Layout />
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
