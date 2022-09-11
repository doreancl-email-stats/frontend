import { Header } from "./header";
import Navbar from "./navbar";
import Dashboard1 from "./dashboard1";

export default function Layout() {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <Header>Dashboard</Header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="h-10 rounded-lg ">
                <Dashboard1 />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
