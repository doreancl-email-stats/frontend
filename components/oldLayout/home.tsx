import Link from 'next/link';

import type { LinkType, StatType } from '../../types/types';
import { LinksTable } from './links-table';
import { SimpleCard } from './simple-card';

export function Home(props: { links: LinkType[]; stats: StatType[] }) {
  return (
    <div>
      <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
      <div className="mt-4">
        <div className="-mx-6 flex flex-wrap">
          <div className="mt-1 w-1/2 px-6 ">
            <div className="flex items-center justify-center rounded-md bg-white px-5 py-6 shadow-sm">
              <div className="mx-5 "></div>
            </div>
          </div>
          <div className="mt-1 w-1/2">
            <SimpleCard number={props.links.length} text={'Links'} />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mb-5">
            <div className="mt-3 flex flex-col justify-between sm:flex-row">
              <div className="flex">
                <h2 className="font-semi-bold text-xl leading-tight text-gray-700">
                  Users
                </h2>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                </div>
              </div>
              <div className="relative mt-2 block sm:mt-0">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
                <Link as={`/create/`} href="/pages/create" passHref>
                  <button className="rounded-md bg-gray-800 px-4 py-2 text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none">
                    {' '}
                    Create
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <LinksTable links={props.links} />
        </div>
      </div>
    </div>
  );
}
