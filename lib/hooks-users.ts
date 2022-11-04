import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { Session } from "../types/userjwt";
import { BFF_API_URL } from "../config";

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
  console.log("getSession");
  //const { data, error } = useSWR("/api/user/", fetcher);
  const data = await fetch(`${BFF_API_URL}/api/user/`);
  console.log(BFF_API_URL, `${BFF_API_URL}/api/user/`);
  console.log('/api/user', data.status, data.statusText);
  const response = await data.json();
  const error = null;
  const user = response?.user;

  console.log(user)
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
      Router.push(redirectTo).then(r => {});
      return;
    }
  }, [redirectTo, redirectIfFound, finished, hasUser, user]);

  // return error ? null : user;
  return [data || null, error];
};
