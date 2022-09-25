import { useAppContext } from "../../context/AppWrapper";
import React, { useEffect, useState } from "react";
import { MONTHS, months } from "../../utils/utils-charts";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  CategoryScale,
  BarElement
);

const EmailDashboardUno = (props) => {
  const [state, dispatch] = useAppContext();
  const [hasMounted1, setHasMounted1] = useState<boolean>(false);
  const [isChartLoaded, setIsChartLoaded] = useState<boolean>(false);

  function loadChart() {
    setIsChartLoaded(true);

    const labels = months({ count: 7 });

    const dataset = loadData();
    console.log("loading chart1", dataset);

    const data = {
      messages: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: dataset,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          options: {
            parsing: {
              xAxisKey: "id",
              yAxisKey: "nested.value",
            },
          },
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
    };
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, config);
  }

  function loadData() {
    //benchmark time
    const start = new Date().getTime();

    try {
      const { headers } = state;
      const dates = {};

      const entries = Object.entries(headers);
      console.log(entries);
      entries.map((k) => {
        const [id, header] = k;
        const internalDate = header.internalDate / 1000;

        if (!internalDate) return;

        const date = new Date(internalDate * 1000);
        const month = date.getMonth();
        //create date with format
        //const dateFormatted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
        const dateFormatted = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
        console.log(date);
        console.log(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          "---",
          dateFormatted
        );
        if (undefined === dates[dateFormatted]) {
          dates[dateFormatted] = 0;
        }
        dates[dateFormatted]++;
      });
      console.log({ dates });

      return dates;
    } catch (e) {
      console.log(e);
    }

    const end = new Date().getTime();
    const time = end - start;
    console.log("time to load data: ", time);
  }

  useEffect(() => {
    setHasMounted1(true);
  }, []);

  useEffect(() => {
    if (hasMounted1) {
      setHasMounted1(true);

      console.log("loading chart2");
      loadChart();
    }
  }, [hasMounted1]);

  return (
    <>
      <p>-----------1</p>
      {state.stats && (
        <>
          <p>Labels:</p>
          <div>
            <canvas id="myChart"></canvas>
          </div>
        </>
      )}
    </>
  );
};
export default EmailDashboardUno;
