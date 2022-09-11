import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import type { Session } from "../types/userjwt";

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

export function useGetSession2() {
  const { data, error } = useSWR(`/api/user`, fetcher);

  useEffect(() => {
    console.log("25252525", { data, error });
  }, [data, error]);

  return {
    session: data,
    isLoading: !error && !data,
    isError: error,
  };
}

const useGetSession = ({
  redirectTo,
  redirectIfFound,
}: UseUserProps): [Session | null, Error | undefined] => {
  const { data, error } = useSWR("/api/user", fetcher);
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
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  // return error ? null : user;
  return [data || null, error];
};
export default useGetSession;
