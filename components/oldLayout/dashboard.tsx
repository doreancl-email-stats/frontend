import {SimpleCard} from "./simple-card";
import {LinksTable} from "./links-table";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {LinkType, StatType} from "../../types/types";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};


export function Dashboard(props: { links: LinkType[], stats: StatType[] }) {

  const now = new Date();
  let dates = [
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4),
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3),
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
    new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
  ];
  const timestamps = dates.map((date) => {
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  });
  const labels = dates.map((date) => {
    return (date.getMonth() + 1) + '-' + date.getDate();
  })

  let dataset: any = {};

  let totalClicks = 0;
  const dataTemplate = labels.map(() => null);

  for (const statsExampleKey in props.stats) {
    const statExample = props.stats[statsExampleKey];
    const link: any = props.links.find(link => link._id == statExample.link);

    if (!link) {
      continue;
    }

    if (!dataset[link._id]) {
      dataset[link._id] = {
        label: link.title,
        data: [...dataTemplate],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    }
    if (timestamps.indexOf(statExample.time) >= 0) {
      dataset[link._id].data[timestamps.indexOf(statExample.time)] = statExample.count
    }
    totalClicks += statExample.count;
  }

  const data: any = {
    labels: labels,
    datasets: Object.values(dataset),
  };

  return <div>
    <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
    <div className="mt-4">
      <div className="flex flex-wrap -mx-6">
        <div className="px-6 w-1/2 mt-1 ">
          <div className="flex justify-center items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div className="mx-5 ">
              <Line options={options} data={data}/>
            </div>
          </div>
        </div>
        <div className="w-1/2 mt-1">
          <SimpleCard number={props.links.length} text={"Links"}/>
          <SimpleCard number={totalClicks} text={"Total Clics"}/>
        </div>
      </div>
    </div>

    <div className="flex flex-col">
      <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mb-5">
          <div className="flex flex-col mt-3 sm:flex-row justify-between">
            <div className="flex">
              <h2 className="text-xl font-semibold leading-tight text-gray-700">Users</h2>

              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                </div>
              </div>
            </div>
            <div className="relative block mt-2 sm:mt-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              </span>
              <Link as={`/create/`} href="/pages/create" passHref>
                <button
                  className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"> Crear
                </button>
              </Link>
            </div>
          </div>
        </div>
        <LinksTable links={props.links}/>
      </div>
    </div>
  </div>;
}
