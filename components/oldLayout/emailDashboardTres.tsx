import { useAppContext } from "../../context/AppWrapper";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getReceivedEmailsHistogram } from "../../lib/hooks-stats";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const EmailDashboardTres = (props) => {
  const [state, dispatch] = useAppContext();
  const [data, setData] = useState({});
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [isChartLoaded, setIsChartLoaded] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, [props]);

  useEffect(() => {
    if (hasMounted && !isChartLoaded) {
      setIsChartLoaded(true);
      loadChart(getReceivedEmailsHistogram(state));
    }
  }, [hasMounted]);

  function loadChart(receivedEmailsHistogram) {
    const chart = {
      options: {
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          //categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          type: "datetime",
        },
      },
      series: [
        {
          name: "Series 1",
          data: receivedEmailsHistogram,
        },
      ],
    };

    setData(chart);
  }

  if (undefined === data.options) {
    return <></>;
  }

  return (
    <>
      <p>2</p>
      {data && state.stats && (
        <>
          <p>Labels:</p>
          <ApexCharts
            options={data.options}
            series={data.series}
            type="line"
            width={500}
            height={320}
          />
        </>
      )}
    </>
  );
};

export default EmailDashboardTres;
