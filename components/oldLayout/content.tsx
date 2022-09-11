import Navbar from "../newLayout/navbar";

type Props = {
  children: React.ReactNode;
};

export function Content({ children }: Props) {
  return (
    <div id="app">
      <div className="font-roboto flex h-screen bg-gray-200">
        <div className="flex flex-1 flex-col overflow-hidden">
          {/*<TopNav />*/}
          <Navbar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
            <div className="container mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
