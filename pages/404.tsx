import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className="mt-4">
        <div className="p-6 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 capitalize">
            Link Not Found
          </h2>

          <Link as={`/`} href="/" passHref>
            <button className="mt-5 px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Volver
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotFound

