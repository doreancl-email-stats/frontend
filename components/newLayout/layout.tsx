import { Header } from "./header";
import Navbar from "./navbar";
import Dashboard1 from "./dashboard1";
import React from "react";

export default function Layout() {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <Header>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">Dashboard</div>
            <div>
              <button className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">
                Download Report
              </button>
            </div>
          </div>
        </Header>
        <main className="bg-gray-100">
          <div className="mx-auto max-w-7xl py-3 sm:px-6 lg:px-8">
            <div className="">
              <div className="rounded-lg ">
                <Dashboard1 />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
