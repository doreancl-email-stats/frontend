import { API_URL } from "../../config";
import { NextApiRequest, NextApiResponse } from "next";

const onGenericEffectWithParams = async ({ url, parameters }) => {
  const res = await fetch(`${url}${parameters}`);
  return await res.json();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { stat, ...params } = req.query;

  const opts = {
    headers: {
      cookie: req.headers.cookie
    }
  };

  const simpleRes = await fetch(`${API_URL}/simple/simplecookie`, opts);
  const response = await simpleRes.json();

  res.status(simpleRes.status).json(response);
}
