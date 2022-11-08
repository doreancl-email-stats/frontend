import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionFromCookie } from "../../lib/server/session";

export default function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user, message } = getSessionFromCookie(req);

    if (user) {
      res.status(200).json({ user, message });
    } else {
      res.status(401).json({ user, message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
