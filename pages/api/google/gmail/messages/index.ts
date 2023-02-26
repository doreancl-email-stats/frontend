import type { Credentials } from "google-auth-library/build/src/auth/credentials";
import { google } from "googleapis";
import { getSessionFromCookie } from "../../../../../lib/server/session";
import { gmail_v1 } from "googleapis/build/src/apis/gmail/v1";
import { GOOGLE_SECRET, PUBLIC_GOOGLE_ID } from "../../../../../config";
import { OAuth2ClientOptions } from "google-auth-library/build/src/auth/oauth2client";

type Token = { accessToken: string; refreshToken: string };

const oauth : OAuth2ClientOptions = {
    clientId: PUBLIC_GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
}

const getAuth = (token: Token) => {
  const auth = new google.auth.OAuth2(oauth);

  const credentials: Credentials = {
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
  };
  auth.setCredentials(credentials);

  return auth;
};

export const gmailGetUserMessagesList = async (
  token: Token,
  pageToken = ""
): Promise<gmail_v1.Schema$Message[]> => {
  const gmail = google.gmail({ version: "v1", auth: getAuth(token) });
  const res1 = await gmail.users.messages.list({
    userId: "me",
    maxResults: 5,
  });
  return res1.data.messages;
};

export default async function handler(req, res) {
  const { user, message } = getSessionFromCookie(req);
  if (!user) {
    return res.status(401).json({ message });
  }
  const data = await gmailGetUserMessagesList({
    accessToken: user.access_token,
    refreshToken: user.refresh_token,
  });

  return res.status(200).json(data);
}
