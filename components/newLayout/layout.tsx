import { Header } from "./header";
import Navbar from "./navbar";
import Dashboard from "./dashboard";
import React from "react";
import { useAppContext } from "../../context/AppWrapper";

export default function Layout() {
  console.log("-------Layout----------");
  const [state, dispatch] = useAppContext();

  const timestamps = state.timestamps || {
    current: { from: 1665532800000, to: 1668262321435 },
    previous: { from: 1662940800000, to: 1665532800000 },
  };

  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <Header>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">Dashboard</div>
            <div>
              <button
                className="px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white
              bg-sky-500 hover:bg-sky-700
              bg-gray-500 hover:bg-gray-500
              cursor-not-allowed
              "
              >
                Download Report
              </button>
            </div>
          </div>
        </Header>
        <main className="bg-gray-100">
          <div className="mx-auto max-w-7xl py-3 sm:px-6 lg:px-8">
            <div className="">
              <div className="rounded-lg ">
                <Dashboard timestamps={timestamps} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
