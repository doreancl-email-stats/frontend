type Props = {
  children: React.ReactNode;
};

export function Header({ children }: Props) {
  return (
    <header className="bg-white shadow border-b">
      <div className="mx-auto max-w-7xl py-3 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {children}
        </h1>
      </div>
    </header>
  );
}
