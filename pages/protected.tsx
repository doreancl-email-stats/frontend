import BasicTable from "../components/oldLayout/basicTable";
import { Content } from "../components/oldLayout/content";
import { useGetSessionHook } from "../lib/hooks-users";

const Protected = () => {
  const [session, error] = useGetSessionHook({});

  if (session) {
    return (
      <>
        <Content>
          <p>
            This is protected content. You can access this content because you
            are signed in.
          </p>
          <BasicTable />
        </Content>
      </>
    );
  }
  return (
    <>
      <Content>
        <p style={{ color: "red" }}>
          You must be sign in to view the protected content on this page.
        </p>
      </Content>
    </>
  );
};

export default Protected;
