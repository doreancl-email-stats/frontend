import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function roundPercent(current, previous) {
  const oli = Math.round((current * 100) / previous) - 100
  return oli || 0;
}

export default function HeroChartElement({
  title = "loading",
  current = 0,
  previous = 0,
  children = null,
}) {
  const isBigger = current < previous;
  const isLower = current > previous;
  const isEquals = current === previous;

  const previousPercentage = roundPercent(current, previous);
  return (
    <div className="p-3 border-l">
      <div>
        <div>{title}</div>
      </div>
      <div className="flex flex-row items-center mt-4">
        <div className="text-lg">
          {current}
          <p>Current: {current}</p>
          <p>Previous: {previous}</p>
        </div>
        <div
          className={classNames(
            isLower && "bg-red-200 text-red-600",
            isBigger && "bg-green-200 text-green-600",
            isEquals && "bg-gray-200 text-gray-600",
            "flex flex-row text-sm ml-1 items-center rounded-3xl"
          )}
        >

          {isLower && <ArrowDownCircleIcon className="w-5" />}
          {isBigger && <ArrowUpCircleIcon className="w-5" />}
          {isEquals && (
            <PauseCircleIcon className="w-5 rotate-90" />
          )}
          <div className="text-sm  pr-1">{previousPercentage} %</div>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
