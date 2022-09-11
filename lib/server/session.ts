import cookie from "cookie";
import { verifyToken } from "../../middleware/utils";
import { Session, User } from "../../types/userjwt";
import { NextApiRequest } from "next";

export const getSessionFromCookie = (
  req: NextApiRequest
): { message: string; user: User } => {
  try {
    if (undefined === req.headers.cookie) {
      return {
        user: null,
        message: "not cookie",
      };
    }

    const cookies = cookie.parse(req.headers.cookie);

    if (cookies.jwt != null) {
      const session = verifyToken(cookies.jwt) as Session;
      if (session && session.user) {
        return { user: session.user, message: "ok" };
      }
    }

    return { user: null, message: "ending" };
  } catch (error) {
    return { user: null, message: error.message };
  }
};
