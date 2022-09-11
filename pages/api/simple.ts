// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { JWT } from 'next-auth/jwt';

import { getAppCookies, verifyToken } from '../../middleware/utils';

const secret = process.env.SECRET;
const clientId = process.env.GOOGLE_ID;
const format = 'metadata';

const clientSecret = process.env.GOOGLE_SECRET;

const simple = async (token: JWT, pageToken = '') => {
  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
  });

  const credentials = {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
  };
  auth.setCredentials(credentials);

  const gmail = google.gmail({ version: 'v1', auth });
  const res1 = await gmail.users.messages.list({ userId: 'me' });
  console.log(res1.data);
  const res2 = await gmail.users.messages.get({
    userId: 'me',
    id: res1.data.messages[0].id,
    format,
    metadataHeaders: ['Date', 'Subject', 'From', 'To', 'Delivered-To'],
  });
  console.log(res2.data);
  console.log(res2.data.payload.headers);
};

async function _getSession(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = getAppCookies(req.headers);
  console.log(42, { jwt });
  if (!jwt) {
    return res.status(401).json({ statusText: ':p' });
  }
  const jwtData = verifyToken(jwt);

  console.log({ jwtData });

  return jwtData;
}

export default async function handler(req, res) {
  console.log(37);
  const session = await _getSession(req, res);
  if (!session) {
    return res.status(401).end();
  }
  // const token: JWT | null = await getToken({ req, secret, encryption: true });
  const data = await simple(session.user);
  res.status(200).json(data);
}
