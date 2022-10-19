import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

import { getLoginSession } from "../../lib/auth";
import { findUser } from "../../lib/user";
import { verifyToken } from "../../middleware/utils";
import type { Session } from "../../types/userjwt";
import { getSessionFromCookie } from "../../lib/server/session";

export default function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user, message } = getSessionFromCookie(req);

    console.log("--------API USER------");
    if (user) {
      res.status(200).json({ user, message });
    } else {
      res.status(401).json({ message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}

export function user3(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (undefined === req.headers.cookie) {
      res.status(401).json({ user: null, message: "not cookie" });
      return;
    }

    const cookies = cookie.parse(req.headers.cookie);

    if (cookies.jwt != null) {
      const session = verifyToken(cookies.jwt) as Session;
      if (session && session.user) {
        res.status(200).json({ user: session.user });
        return;
      }
    }

    res.status(401).json({ user: null, message: "ending" });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}

export async function user2(req, res) {
  try {
    const session: Session = (await getLoginSession(req)) as Session;
    console.log({ session });

    const user = (session && (await findUser(session))) ?? null;

    if (user === null) {
      res.status(401).json({ user });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
