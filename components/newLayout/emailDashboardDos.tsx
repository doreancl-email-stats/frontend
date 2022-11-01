import React from "react";
import dynamic from "next/dynamic";
import { Props } from "react-apexcharts";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const EmailDashboardDos = ({ data, type = "bar", timestamps }) => {
  const chart: Props = {
    options: {
      title: {},
      chart: {
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
        type: "datetime",
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
    type: type as Props["type"],
  };

  return (
    <>
      {data && (
        <>
          <ApexCharts
            options={chart.options}
            series={chart.series}
            type={chart.type}
          />
        </>
      )}
    </>
  );
};

export default EmailDashboardDos;
