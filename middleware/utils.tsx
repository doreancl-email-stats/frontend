import cookie from "cookie";
import type { IncomingHttpHeaders } from "http";
import type { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "";

export const verifyToken = (jwtToken: string): null | JwtPayload | string => {
  try {
    return verify(jwtToken, SECRET_KEY);
  } catch (e) {
    console.log('verifyToken e:', e);
    return null;
  }
};

export function getAppCookies(headers: IncomingHttpHeaders): any {
  if (headers.cookie) {
    return cookie.parse(headers.cookie);
  }
  return null;
}
