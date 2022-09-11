import cookie from 'cookie';
import type { JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyToken } from '../../middleware/utils';

const userOld = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = {
      user: {},
    };
    if (req.headers.cookie != null) {
      const { jwt } = cookie.parse(req.headers.cookie);
      console.log(jwt);
      if (!jwt) {
        return res.status(401).json({ statusText: ':p' });
      }
      const jwtData = verifyToken(jwt) as JwtPayload;
      response.user = jwtData;
    } else {
      return res.status(401).json({ statusText: ':p' });
    }

    res.status(200).json(response.user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .end({ statusText: 'Authentication token is invalid, please log in' });
  }
};
export default userOld;
