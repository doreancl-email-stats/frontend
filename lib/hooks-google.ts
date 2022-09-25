import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return data;
    });

export const useGetMessages = () => {
  const { data, error } = useSWR("/api/google/gmail/messages", fetcher);
  return [data || null, error];
};

export const useGetMessage = (id: string) => {
  const { data, error } = useSWR(`/api/google/gmail/messages/${id}`, fetcher);
  return [data || null, error];
};
