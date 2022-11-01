import { useGetSessionHook } from "../lib/hooks-users";

const Protected = () => {
  const [session, error] = useGetSessionHook({});

  if (session) {
    return (
      <>
        <>
          <p>
            This is protected content. You can access this content because you
            are signed in.
          </p>
        </>
      </>
    );
  }
  return (
    <>
      <>
        <p style={{ color: "red" }}>
          You must be sign in to view the protected content on this page.
        </p>
      </>
    </>
  );
};

export default Protected;
