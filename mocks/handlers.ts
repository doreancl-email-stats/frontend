import { rest } from "msw";
import userJsonData from "./data/user.json" assert { type: "json" };

const API_URL = process.env.NEXT_PUBLIC_RECIPES_API_URL;
const BFF_API_URL = process.env.NEXT_PUBLIC_BFF_API_URL;

const BFF_Handalers = [
  rest.get(BFF_API_URL + "/api/user/", (req, res, ctx) => {
    return res(ctx.json(userJsonData));
  }),
];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const _hanadlers = [
  rest.get(
    `${BFF_API_URL}/api/stats/total_unraead_emails?from=:form&to=:to}`,
    (req, res, ctx) => {
      return res(ctx.json({ count: randomInteger(500, 100) }));
    }
  ),
  rest.get(
    `${BFF_API_URL}/api/stats/total_promotions_emails`,
    (req, res, ctx) => {
      return res(ctx.json({ count: randomInteger(500, 100) }));
    }
  ),
  rest.get(
    `${BFF_API_URL}/api/stats/total_received_emails`,
    (req, res, ctx) => {
      return res(ctx.json({ count: randomInteger(500, 100) }));
    }
  ),
  rest.get(`${BFF_API_URL}/api/stats/total_sent_emails`, (req, res, ctx) => {
    return res(ctx.json({ count: randomInteger(500, 100) }));
  }),
];

export const handlers = [].concat([]);
