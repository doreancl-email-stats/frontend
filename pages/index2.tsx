import type { GetServerSideProps } from "next";

import { Content } from "../components/oldLayout/content";
import { useGetSessionHook } from "../lib/hooks-users";
import EmailDashboard from "../components/oldLayout/emailDashboard";

const Index2 = () => {
  const [session, error] = useGetSessionHook({});

  return (
    <>
      <Content>
        {session && false && (
          <>
            <p>Currently logged in as:</p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </>
        )}

        {session && (
          <>
            <EmailDashboard />
          </>
        )}
        {error && (
          <>
            <p>Error:</p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        )}
      </Content>
    </>
  );
};

export default Index2;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
