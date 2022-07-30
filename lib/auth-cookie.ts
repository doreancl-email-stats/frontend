import { serialize, parse } from 'cookie'
import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_NAME = 'jwt'
export const MAX_AGE = 60 * 60 * 8 // 8 hours

export function parseCookies(req: NextApiRequest, res: NextApiResponse) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}