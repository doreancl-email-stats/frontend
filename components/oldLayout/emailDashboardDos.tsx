import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Chart = {
  options: ApexOptions;
  series: ApexOptions["series"];
};
const EmailDashboardDos = ({ data, type = "bar", timestamps }) => {
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
        //categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        //messages: { show: false, },
        //crosshairs: { show: false,},
        //labels: { format: 'dd/MM', }
        offsetY: -12,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        min: timestamps?.current.from,
        max: timestamps?.current.to,
        //tickAmount: 10,
        type: 'datetime',
      },
      yaxis: {
        // messages: {show: false},
        axisBorder: {
          // show: false,
        },
        min: 0,
        //tickAmount: 1,
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
        data,
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
