import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .catch((e) => {
      console.log("error", e);
    });

const fetcherWithParameters = (url, parameters = "") => {
  // Example fetch to demonstrate the log/ic
  console.log(`${url}${parameters}`);
  return fetch(`${url}${parameters}`)
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
    });
};

interface TimestampBetween {
  from: number;
  to: number;
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

  const res = await fetch(`api/${url}${parameters}`);
  const data: any = await res.json();

  return {
    loading: false,
    data,
    error: undefined,
  };
};

export const onGetUnreadEmails = async ({
  from = 0,
  to = 0,
}: TimestampBetween) => {
  return await onGenericEffectWithParams({
    url: `stats/total_unread_emails/`,
    parameters: `?from=${from}&to=${to}`,
  });
};
export const onGetPromotionsEmails = async ({ from, to }: TimestampBetween) => {
  return await onGenericEffectWithParams({
    url: `stats/total_promotions_emails/`,
    parameters: `?from=${from}&to=${to}`,
  });
};
export const onGetReceivedEmails = async ({ from, to }: TimestampBetween) => {
  return await onGenericEffectWithParams({
    url: `stats/total_received_emails/`,
    parameters: `?from=${from}&to=${to}`,
  });
};
export const onGetSentEmails = async ({ from, to }: TimestampBetween) => {
  return await onGenericEffectWithParams({
    url: `stats/total_sent_emails/`,
    parameters: `?from=${from}&to=${to}`,
  });
};
export const onGetReceivedEmailsHistogram = async ({
  from,
  to,
  unit,
}: TimestampBetweenWithUnit) => {
  return await onGenericEffectWithParams({
    url: `stats/received_emails_histogram/`,
    parameters: `?from=${from}&to=${to}&unit=${unit}`,
  });
};
export const onGetSentEmailsHistogram = async ({
  from,
  to,
  unit,
}: TimestampBetweenWithUnit) => {
  return await onGenericEffectWithParams({
    url: `stats/sent_emails_histogram/`,
    parameters: `?from=${from}&to=${to}&unit=${unit}`,
  });
};

export const onGetTopInteractions = async ({
  from,
  to,
  groupBy,
}: TimestampBetweenGrouped) => {
  const res = await onGenericEffectWithParams({
    url: `stats/top_interactions/`,
    parameters: `?from=${from}&to=${to}&group_by=${groupBy}`,
  });
  for (let i = 0; i < res.data.length; i++) {
    res.data[i].xx = /<(.*)>/g.exec(res.data[i].email_address);
  }
  return res;
};
