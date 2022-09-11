import React from "react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const EmailDashboardDos = ({ data }) => {
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
        data: data,
      },
    ],
  };

  return (
    <>
      <p>2</p>
      {data && (
        <>
          <p>Labels:</p>
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type="line"
            width={500}
            height={320}
          />
        </>
      )}
    </>
  );
};

export default EmailDashboardDos;
