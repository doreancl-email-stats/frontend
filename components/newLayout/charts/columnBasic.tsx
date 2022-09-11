import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ColumnBasic = () => {
  type Chart = {
    options: ApexOptions;
    series: ApexOptions["series"];
  };
  var chart: Chart = {
    options: {
      title: {

      },
      chart: {
        type: "bar",
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
        categories: [1,2,3,4,5,6,7,8,9],
        offsetY: -12,
        labels: {
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
        labels: {
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
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
    ],
  };

  return (
    <>
      {chart && (
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

export default ColumnBasic;
