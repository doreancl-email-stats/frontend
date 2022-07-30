import { Content } from "../components/content";
import { GetServerSideProps } from "next";
import { getAppCookies, verifyToken } from '../middleware/utils';

export default function Protected({ session }) {
  if (session) {
    return (
      <>
        <Content>
          <p>This is protected content. You can access this content because you are signed in.</p>
        </Content>
      </>
    )
  }
  return (
    <>
      <Content>
        <p style={{ color: 'red' }}>You must be sign in to view the protected content on this page.</p>
      </Content>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req } = context;

  const { jwt } = getAppCookies(req.headers);

  if (!jwt) {
    return {
      props: {
        session: 0,
      },
    }
  }

  const jwtData = verifyToken(jwt);

  const { user } = jwtData

  return {
    props: {
      session: jwt,
    },
  }

  if (0) {
    const res = await fetch('/api/simple');
    const data = await res.json()

    console.log(data);
  }

  return {
    props: {
      session: user,
    },
  }
}