import type { Credentials } from "google-auth-library/build/src/auth/credentials";
import { google } from "googleapis";
import { getSessionFromCookie } from "../../../../lib/server/session";

const clientId = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;

type Token = { accessToken: string; refreshToken: string };

const getAuth = (token: Token) => {
  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
  });

  const credentials: Credentials = {
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
  };
  auth.setCredentials(credentials);

  return auth;
};

export const simplelistLabels = async (token: Token, pageToken = "") => {
  const gmail = google.gmail({ version: "v1", auth: getAuth(token) });
  const res1 = await gmail.users.messages.list({
    userId: "me",
    maxResults: 500,
  });
  return res1.data.messages;
};

export default async function handler(req, res) {
  const { user, message } = getSessionFromCookie(req);
  if (!user) {
    return res.status(401).json({ message });
  }
  const data = await simplelistLabels({
    accessToken: user.access_token,
    refreshToken: user.refresh_token,
  })

  return res.status(200).json(data);
}
