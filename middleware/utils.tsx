import cookie from "cookie";
import type { IncomingHttpHeaders } from "http";
import type { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const verifyToken = (jwtToken: string): null | JwtPayload | string => {
  try {
    return verify(jwtToken, JWT_SECRET, {
      ignoreExpiration: true,
    });
  } catch (e) {
    console.log("verifyToken e:", e);
    return null;
  }
};

export function getAppCookies(headers: IncomingHttpHeaders): any {
  if (headers.cookie) {
    return cookie.parse(headers.cookie);
  }
  return null;
}
