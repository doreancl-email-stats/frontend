import { NextApiRequest, NextApiResponse } from "next";
import Cookies from 'js-cookie';
import Router from "next/router";

const TOKEN_SECRET = process.env.TOKEN_SECRET

export function signOut(req?: NextApiRequest, res?: NextApiResponse) {
  Cookies.remove('jwt');
  Router.push({ pathname: '/', query: {} }, '/');
}



