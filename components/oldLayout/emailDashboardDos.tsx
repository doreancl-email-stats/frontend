import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Chart = {
  options: ApexOptions;
  series: ApexOptions["series"];
};
const EmailDashboardDos = ({ data, type = 'bar' }) => {
  var chart: Chart = {
    options: {
      title: {},
      chart: {
        type: type as ApexOptions["chart"]["type"],
        toolbar: { show: false },
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: "right",
        },
        x: {
          show: false,
        },
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        offsetY: -12,
        messages: {
          //show: false,
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          //show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        messages: {
          show: false,
        },
        axisBorder: {
          // show: false,
        },
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
        },
      },
    },
    series: [
      {
        name: "Net Profit",
        data: data,
      },
    ],
  };

  const chart2 = {
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
      {data && (
        <>
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type={chart.options.chart.type}
          />
        </>
      )}
    </>
  );
};

export default EmailDashboardDos;
