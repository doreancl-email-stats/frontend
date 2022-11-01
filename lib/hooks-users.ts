import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { Session } from "../types/userjwt";

const API_URL = process.env.NEXT_PUBLIC_RECIPES_API_URL;
const BFF_API_URL = process.env.NEXT_PUBLIC_BFF_API_URL;

type UseUserProps = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return data;
    });

export const getSession = async ({
  redirectTo,
  redirectIfFound,
}: UseUserProps) => {
  //const { data, error } = useSWR("/api/user/", fetcher);
  const data = await fetch(`${BFF_API_URL}/api/user/`);
  const response = await data.json();
  const error = null;
  const user = response?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  // if no redirect needed, just return (example: already on /dashboard)
  // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
  //if (!redirectTo || !finished) return;

  // return error ? null : user;
  return [user || null, error];
};

export const useGetSessionHook = ({
  redirectTo,
  redirectIfFound,
}: UseUserProps): [Session | null, Error | undefined] => {
  const { data, error } = useSWR(`${BFF_API_URL}/api/user/`, fetcher);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !finished) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
      return;
    }
  }, [redirectTo, redirectIfFound, finished, hasUser, user]);

  // return error ? null : user;
  return [data || null, error];
};
