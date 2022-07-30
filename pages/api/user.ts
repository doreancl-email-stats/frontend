import { getAppCookies, verifyToken } from "../../middleware/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { jwt } = getAppCookies(req.headers);

    if (!jwt) {
      return res.status(401).json({ statusText: ':p' });
    }
    const jwtData = verifyToken(jwt);
    const { user } = jwtData

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).end({ statusText: 'Authentication token is invalid, please log in' })
  }
}