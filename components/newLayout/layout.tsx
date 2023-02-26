import { Header } from "./header";
import Navbar from "./navbar";
import Dashboard from "./dashboard";
import React from "react";
import { useAppContext } from "../../context/AppWrapper";
import { APP_STATE } from "../../context/AppReducer";

export default function Layout({ timestamps }) {
  console.log("-------Layout----------");

  const [state, dispatch] = useAppContext();

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
                {state.app_state == APP_STATE.READY ? (
                  <Dashboard timestamps={timestamps} />
                ) : (
                  <div className="text-center">
                    <p>Loading</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
