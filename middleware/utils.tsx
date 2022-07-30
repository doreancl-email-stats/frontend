import { verify } from 'jsonwebtoken';
import { NextApiRequest } from "next";
import { IncomingHttpHeaders } from "http";

const SECRET_KEY = process.env.JWT_SECRET;

export function verifyToken(jwtToken: string) {
  try {
    return verify(jwtToken, SECRET_KEY);
  } catch (e) {
    console.log('e:', e);
    return null;
  }
}

export function getAppCookies(headers: IncomingHttpHeaders) {
  const parsedItems = {};
  if (headers.cookie) {
    const cookiesItems = headers.cookie.split('; ');
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split('=');
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
  }
  return parsedItems;
}