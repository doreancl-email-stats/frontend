import type { GetServerSideProps } from "next";

import { Content } from "../components/oldLayout/content";
import useGetSession from "../lib/hooks-users";

const Index = () => {
  const [session, error] = useGetSession({});

  return (
    <>
      <Content>
        <p>oli</p>
      </Content>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
