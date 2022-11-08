import cookie from "cookie";
import { verifyToken } from "../../middleware/utils";
import { Session } from "../../types/userjwt";

export const validateCookie = (strinCookies: string) => {
  try {
    const cookies = cookie.parse(strinCookies);
    console.log("validateCookie", cookies);
    if (cookies.jwt != null) {
      const session = verifyToken(cookies.jwt) as Session;
      if (session && session.user) {
        return { user: session.user, message: "ok" };
      }
      return { user: null, message: "expired session" };
    }
    return { user: null, message: "no jwt" };
  } catch (error) {
    return { user: null, message: error.message };
  }
};
