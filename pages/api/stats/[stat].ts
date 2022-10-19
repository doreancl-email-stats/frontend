import type { Credentials } from "google-auth-library/build/src/auth/credentials";
import { google } from "googleapis";

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
  const data: any = await res.json();
  return data;
};
const API_URL = process.env.NEXT_PUBLIC_RECIPES_API_URL;
const BFF_API_URL = `${process.env.NEXT_PUBLIC_BFF_API_URL}/api`;

export default async function handler(req, res) {
  const { stat, ...params } = req.query;

  const url = `${stat}?${encodeData(params)}`;

  const lelo = await onGenericEffectWithParams({
    url: `${API_URL}/stats/${stat}`,
    parameters: `?${encodeData(params)}`,
  });

  res.status(200).json(lelo);
}
