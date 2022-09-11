import Iron from '@hapi/iron';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAppCookies, verifyToken } from '../middleware/utils';
import { getTokenCookie, MAX_AGE, setTokenCookie } from './auth-cookies';

const { TOKEN_SECRET } = process.env;

export async function setLoginSession(res, session) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getLoginSessionCP(req) {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}

export async function getLoginSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = getAppCookies(req.headers);

  if (undefined === req.headers.cookie) {
    return null;
  }

  const cookies = cookie.parse(req.headers.cookie);
  // const headers = getAppCookies(req.headers);
  console.log(42, headers, cookies);
  return null;
  if (!jwt) {
    return res.status(401).json({ statusText: ':p' });
  }
  const jwtData = verifyToken(jwt);

  console.log({ jwtData });

  return jwtData;
}
