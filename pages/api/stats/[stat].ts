import type { Credentials } from "google-auth-library/build/src/auth/credentials";
import { google } from "googleapis";
import {
  GOOGLE_SECRET,
  PUBLIC_GOOGLE_ID,
  PULBIC_API_URL,
} from "../../../config";

type Token = { accessToken: string; refreshToken: string };
const format = "metadata";

const getAuth = (token: Token) => {
  const auth = new google.auth.OAuth2({
    clientId: PUBLIC_GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
  });

  const credentials: Credentials = {
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
  };
  auth.setCredentials(credentials);

  return auth;
};

function encodeData(data) {
  return Object.keys(data)
    .map(function (key) {
      return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
}

const onGenericEffectWithParams = async ({ url, parameters }) => {
  //const { data, error } = fetch([url, parameters], fetcherWithParameters);
  const res = await fetch(`${url}${parameters}`);
  return await res.json();
};

export default async function handler(req, res) {
  const { stat, ...params } = req.query;

  const url = `${stat}?${encodeData(params)}`;

  const lelo = await onGenericEffectWithParams({
    url: `${PULBIC_API_URL}/stats/${stat}`,
    parameters: `?${encodeData(params)}`,
  });

  res.status(200).json(lelo);
}
