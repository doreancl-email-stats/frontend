import {LinksTableTh} from "./links-table-th";
import Link from 'next/link'
import {LinkType} from "../../types/types";

type Props = {
  links: LinkType[],
}

export function LinksTable({links}: Props) {
  const API_URL = process.env.NEXT_PUBLIC_RECIPES_API_URL;
  return <div
    className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
    <table className="min-w-full">
      <thead>
      <tr>
        <LinksTableTh text={'title'}/>
        <LinksTableTh text={'short url'}/>
        <LinksTableTh text={'long url'}/>
        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"/>
      </tr>
      </thead>
      <tbody className="bg-white">
      {links.map((link) => (
        <tr key={link._id}>
          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            <div className="flex items-center">
              <div className="">
                <div className="text-sm font-medium leading-5 text-gray-900">{link.title}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            <div className="flex items-center">
              <div className="">
                <div className="relative mx-0 lg:mx-0 text-sm leading-5 text-gray-500">
                  <span className="absolute inset-y-0 left-0 flex items-center">
                    <img className='class="w-5 h-5 text-gray-500"'
                         src='https://img.icons8.com/pastel-glyph/344/external-link--v1.png'/>
                  </span>
                  <div
                    className="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    <a
                      href={`${API_URL}/links/redirect/${link.link}`}
                      target="_blank"
                      className="text-indigo-600 hover:text-indigo-900" rel="noreferrer">redirect/{link.link}</a>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            <div className="relative mx-0 lg:mx-0 text-sm leading-5 text-gray-500">
                  <span className="absolute inset-y-0 left-0 flex items-center">
                    <img className='class="w-5 h-5 text-gray-500"'
                         src='https://img.icons8.com/pastel-glyph/344/external-link--v1.png'/>
                  </span>
              <div
                className="w-32 pl-10 pr-4 text-gray-500 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                <a
                  href={link.long_url}
                  target="_blank"
                  className="text-gray-500 hover:text-indigo-900" rel="noreferrer">{link.long_url}</a>
              </div>
            </div>
          </td>
          <td
            className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
            <Link as={`/link/${link._id}`} href="/link/[slug]">
              <a className="text-indigo-600 hover:text-indigo-900">Edit</a>
            </Link>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>;
}
