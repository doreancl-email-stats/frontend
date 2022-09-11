export const getTotalSentEmails = (state) => {
  return 1;
};

export const getReceivedEmailsHistogram = (state) => {
  return getFromHistogramWithFilter({
    state,
    excludedLabel: "SENT",
  });
};

export const getSendedEmailsHistogram = (state) => {
  return getFromHistogramWithFilter({
    state,
    onlyLabel: "SENT",
  });
};

export const getFromHistogramWithFilter = ({
  state,
  onlyLabel = null,
  excludedLabel = null,
}) => {
  //benchmark time
  var sortedObjs: any[];
  const start = new Date().getTime();
  const dataset = [];

  try {
    const { headers } = state;
    const dates = {};

    const entries = Object.entries(headers);
    entries.map((k) => {
      const [id, header] = k;

      try {
        const { labelIds } = header;

        if (onlyLabel && !labelIds.includes(onlyLabel)) {
          return;
        }

        if(excludedLabel && labelIds.includes(excludedLabel)){
          return;
        }

        const internalDate = header.internalDate / 1000;
        if (!internalDate) return;

        const date = new Date(internalDate * 1000);
        const month = date.getMonth();
        //create date with format
        //const dateFormatted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
        const dateFormatted = `${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        if (undefined === dates[dateFormatted]) {
          dates[dateFormatted] = 0;
        }
        dates[dateFormatted]++;
      } catch (e) {
        return;
      }
    });

    for (const [key, value] of Object.entries(dates)) {
      dataset.push({ x: new Date(key).getTime(), y: value });
    }

    dataset.sort((a, b) => (a.x > b.x ? 1 : -1));
  } catch (e) {
    console.log(e);
  }

  const end = new Date().getTime();
  const time = end - start;
  console.log("time to load data: ", time);
  return dataset;
};
