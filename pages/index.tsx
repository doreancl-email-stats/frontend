import type { GetServerSideProps } from "next";
import Layout from "../components/newLayout/layout";

const Index = () => {
  return <Layout />;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
