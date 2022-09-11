import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import ColumnBasic from "./charts/columnBasic";

export default function HeroChartElement() {
  return (
    <div className="p-3 border-l-2">
      <div>
        <div>Total Streams</div>
        <div className="font-medium text-xs text-gray-400 ">
          Feb 20 - Mar19, 2022
        </div>
      </div>
      <div className="flex flex-row border-green-500 items-center mt-4">
        <div className="text-lg">24.3M</div>
        <div className="flex flex-row text-sm ml-1 bg-green-200 items-center rounded-3xl ">
          <ArrowUpCircleIcon className="w-5 text-green-600" />
          <div className="text-sm text-green-600 pr-1">+11.3%</div>
        </div>
      </div>
      <div className="border-2">
        <ColumnBasic />
      </div>
    </div>
  );
}
