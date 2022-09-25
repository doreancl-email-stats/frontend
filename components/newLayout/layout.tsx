import { Header } from "./header";
import Navbar from "./navbar";
import Dashboard1 from "./dashboard1";

export default function Layout() {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <Header>Dashboard</Header>
        <main className="bg-gray-100">
          <div className="  mx-auto max-w-7xl py-3 sm:px-6 lg:px-8">
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
