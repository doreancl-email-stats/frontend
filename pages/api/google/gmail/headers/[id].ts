import type { Credentials } from "google-auth-library/build/src/auth/credentials";
import { google } from "googleapis";
import { getSessionFromCookie } from "../../../../../lib/server/session";

const clientId = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;

type Token = { accessToken: string; refreshToken: string };
const format = "metadata";

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

export const getSimpleHeaders = async (id, token: Token) => {
  const gmail = google.gmail({ version: "v1", auth: getAuth(token) });
  const res2 = await gmail.users.messages.get({
    userId: "me",
    id: id,
    format,
    metadataHeaders: ["Date", "Subject", "From", "To", "Delivered-To"],
  });
  console.log(353535, res2.data);
  return res2.data;
};

export default async function handler(req, res) {
  const { id } = req.query;
  const { user, message } = getSessionFromCookie(req);
  if (!user) {
    return res.status(401).json({ message });
  }
  const data = await getSimpleHeaders(id, {
    accessToken: user.access_token,
    refreshToken: user.refresh_token,
  });

  return res.status(200).json(data);
}
