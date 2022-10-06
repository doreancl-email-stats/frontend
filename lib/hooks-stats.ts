import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_RECIPES_API_URL;
const BFF_API_URL = process.env.NEXT_PUBLIC_BFF_API_URL;

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .catch((e) => {
      console.log("error", e);
    });

const fetcherWithParameters = (url, parameters = "") => {
  // Example fetch to demonstrate the logic
  console.log(`${url}${parameters}`);
  return fetch(`${url}${parameters}`)
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
    });
};

interface TimestampBetween {
  from: Date;
  to: Date;
}

interface TimestampBetweenGrouped extends TimestampBetween {
  groupBy: string;
}

interface TimestampBetweenWithUnit extends TimestampBetween {
  unit: string;
}

const useGenericEffect = ({ url }) => {
  const { data, error } = useSWR(url);
  const loading = !data && !error;
  return { loading, data, error };
};

const onGenericEffectWithParams = async ({ url, parameters }) => {
  //const { data, error } = fetch([url, parameters], fetcherWithParameters);

  const res = await fetch(`${url}${parameters}`);
  const data: any = await res.json();

  return {
    loading: false,
    data,
    error: undefined,
  };
};

export const onGetUnreadEmails = async ({ from, to }: TimestampBetween) => {
  return await onGenericEffectWithParams({
    url: `${API_URL}/stats/total_unread_emails`,
    parameters: `?from=${from.getTime()}&to=${to.getTime()}`,
  });
};
export const onGetPromotionsEmails = async ({ from, to }: TimestampBetween) => {
  return await onGenericEffectWithParams({
    url: `${API_URL}/stats/total_promotions_emails`,
    parameters: `?from=${from.getTime()}&to=${to.getTime()}`,
  });
};
export const onGetReceivedEmails = async ({ from, to }: TimestampBetween) => {
  return await onGenericEffectWithParams({
    url: `${API_URL}/stats/total_received_emails`,
    parameters: `?from=${from.getTime()}&to=${to.getTime()}`,
  });
};
export const onGetSentEmails = async ({ from, to }: TimestampBetween) => {
  return await onGenericEffectWithParams({
    url: `${API_URL}/stats/total_sent_emails`,
    parameters: `?from=${from.getTime()}&to=${to.getTime()}`,
  });
};
export const onGetReceivedEmailsHistogram = async ({
  from,
  to,
  unit,
}: TimestampBetweenWithUnit) => {
  return await onGenericEffectWithParams({
    url: `${API_URL}/stats/received_emails_histogram`,
    parameters: `?from=${from.getTime()}&to=${to.getTime()}&unit=${unit}`,
  });
};
export const onGetSentEmailsHistogram = async ({
  from,
  to,
  unit,
}: TimestampBetweenWithUnit) => {
  return await onGenericEffectWithParams({
    url: `${API_URL}/stats/sent_emails_histogram`,
    parameters: `?from=${from.getTime()}&to=${to.getTime()}&unit=${unit}`,
  });
};

export const onGetTopInteractions = async ({
  from,
  to,
  groupBy,
}: TimestampBetweenGrouped) => {
  return await onGenericEffectWithParams({
    url: `${API_URL}/stats/top_interactions`,
    parameters: `?from=${from.getTime()}&to=${to.getTime()}&group_by=${groupBy}`,
  });
};
