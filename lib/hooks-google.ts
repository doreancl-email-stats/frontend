import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return data;
    });

export const useGetLabels = () => {
  const { data, error } = useSWR("/api/google/gmail/labels", fetcher);
  return [data || null, error];
};

export const useGetHeaders = (id: string) => {
  const { data, error } = useSWR(`/api/google/gmail/headers/${id}`, fetcher);
  return [data || null, error];
};
