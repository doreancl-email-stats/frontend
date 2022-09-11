import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import HeroChartElement from "./hero-chart-element";

type Props = {
  children: React.ReactNode;
};

export default function Dashboard1() {
  let receivedHistogram = [
    {
      x: "2021-01-01",
      y: 1,
    },
  ];
  return (
    <div className="flex flex-col font-sans">
      <div id="hero" className="flex flex-col">
        <div className="p-3 flex flex-row justify-between border-t-2 border-x-2">
          <div className="flex flex-row content-center">
            <div>All Stores</div>
            <ChevronDownIcon className="w-5" />
          </div>
          <div>Past mont</div>
        </div>
        <div
          className="grid grid-cols-4 border-b-2 border-t-2 border-r-2"
          id="charts"
        >
          <HeroChartElement />
          <HeroChartElement />
          <HeroChartElement />
          <HeroChartElement />
        </div>
        <div id="hero-filters-botom" className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div>all stores</div>
            <div>apple music</div>
            <div>spotify</div>
            <div>dezzwer</div>
            <div>otro</div>
          </div>
          <div>
            <div>download report</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row bg-blue-50 border-2 border-red-400">
        <div className="flex flex-col basis-2/3 border-2 border-cyan-400">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <div>top streaming</div>
              <div>top downloaded tracks</div>
            </div>
            <div className="">
              <div>this month</div>
            </div>
          </div>
          <div id="table-top-streaming-tracks" className="flex justify-center">
            la terrible tabla
          </div>
          <div className="flex justify-center border-4 border-black">
            view all top tracks
          </div>
        </div>
        <div className="flex flex-col basis-1/3 border-2 border-purple-400">
          <div className="flex flex-row justify-between">
            <div>
              <div>top Artist</div>
            </div>
            <div>
              <div>this month</div>
            </div>
          </div>
          <div>la terrible tabla</div>
          <div className="flex justify-center">view all top artist</div>
        </div>
      </div>
    </div>
  );
}
