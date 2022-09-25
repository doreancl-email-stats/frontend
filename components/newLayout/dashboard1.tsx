import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import HeroChartElement from "./hero-chart-element";
import { useAppContext } from "../../context/AppWrapper";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import EmailDashboardDos from "../oldLayout/emailDashboardDos";
import {
  onGetPromotionsEmails,
  onGetReceivedEmails,
  onGetSentEmails,
  onGetTopInteractions,
  onGetUnreadEmails,
} from "../../lib/hooks-stats";

const bla = {
  loading: true,
  data: {
    count: 1,
  },
  error: null,
};

const ble = {
  loading: true,
  data: [],
  error: null,
};

export default function Dashboard1() {
  const [state, dispatch] = useAppContext();
  const [isChartLoaded, setIsChartLoaded] = useState<boolean>(false);
  const [receivedHistogram, setReceivedHistogram] = useState(null);
  const [sendedHistogram, setSendedHistogram] = useState(null);
  const [totalUnreadEmails, setTotalUnreadEmails] = useState(null);
  const [timestapCurrent, setTimestapCurrent] = useState({
    from: new Date(),
    to: new Date(),
  });
  const [timestampPrevious, setTimestampPrevious] = useState({
    from: new Date(),
    to: new Date(),
  });
  const [unreadEmails, setUnreadEmails] = useState(bla);
  const [promotionsEmails, setPromotionsEmails] = useState(bla);
  const [receivedEmails, setReceivedEmails] = useState(bla);
  const [sentEmails, setSentEmails] = useState(bla);
  const [unreadEmailsPrevious, setUnreadEmailsPrevious] = useState(bla);
  const [promotionsEmailsPrevious, setPromotionsEmailsPrevious] = useState(bla);
  const [receivedEmailsPrevious, setReceivedEmailsPrevious] = useState(bla);
  const [sentEmailsPrevious, setSentEmailsPrevious] = useState(bla);
  const [topInteractionsByAddress, setTopInteractionsByAddress] = useState(ble);
  const [topInteractionsByDomain, setTopInteractionsByDomain] = useState(ble);

  useEffect(() => {
    console.log("----dashboard1.tsx--INIT--");
    timestapCurrent.from.setHours(0, 0, 0, 0);
    timestapCurrent.from.setMonth(timestapCurrent.from.getMonth() - 1);
    setTimestapCurrent(timestapCurrent);

    timestampPrevious.to.setHours(0, 0, 0, 0);
    timestampPrevious.to.setMonth(timestampPrevious.from.getMonth() - 2);
    timestampPrevious.from.setHours(23, 60, 60);
    timestampPrevious.from.setMonth(timestampPrevious.from.getMonth() - 1);
    setTimestampPrevious(timestampPrevious);

    (async () => {
      setUnreadEmails(await onGetUnreadEmails(timestapCurrent));
      setUnreadEmailsPrevious(await onGetUnreadEmails(timestampPrevious));

      setPromotionsEmails(await onGetPromotionsEmails(timestapCurrent));
      setPromotionsEmailsPrevious(
        await onGetPromotionsEmails(timestampPrevious)
      );

      setReceivedEmails(await onGetReceivedEmails(timestapCurrent));
      setReceivedEmailsPrevious(await onGetReceivedEmails(timestampPrevious));

      setSentEmails(await onGetSentEmails(timestapCurrent));
      setSentEmailsPrevious(await onGetSentEmails(timestampPrevious));

      setTopInteractionsByAddress(
        await onGetTopInteractions({ ...timestapCurrent, groupBy: "address" })
      );
      setTopInteractionsByDomain(
        await onGetTopInteractions({ ...timestapCurrent, groupBy: "domain" })
      );
    })();
  }, []);

  const headersTopByAddress = [
    { name: "email_address", display: "Email" },
    { name: "interactions", display: "Interactions" },
    { name: "sent_messages", display: "Sent Smessages" },
    { name: "received_messages", display: "Received messages" },
  ];
  const headersTopByDomain = [
    { name: "domain", display: "Domain" },
    { name: "interactions", display: "Interactions" },
  ];
  console.log(topInteractionsByAddress);
  console.log(topInteractionsByDomain);

  function roundPercent(current, previous) {
    return Math.round((current / previous - 1) * 100);
  }

  return (
    <div className="flex flex-col font-sans">
      <div className="bg-white shadow-lg flex flex-col">
        <div className="p-3 flex flex-row justify-between border">
          <div className="flex flex-row content-center">
            <div>All Stores</div>
            <ChevronDownIcon className="w-5" />
          </div>
          <div>Past mont</div>
        </div>
        <div className="grid grid-cols-4 border-r">
          {unreadEmails.loading || unreadEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Unread Messages"
              current={unreadEmails.data.count}
              previousPercentage={roundPercent(
                unreadEmails.data.count,
                unreadEmailsPrevious.data.count
              )}
            />
          )}
          {promotionsEmails.loading || promotionsEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Promotion Messages"
              current={promotionsEmails.data.count}
              previousPercentage={roundPercent(
                promotionsEmails.data.count,
                promotionsEmailsPrevious.data.count
              )}
            />
          )}
          {receivedEmails.loading || receivedEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Received Messages"
              current={receivedEmails.data.count}
              previousPercentage={roundPercent(
                receivedEmails.data.count,
                receivedEmailsPrevious.data.count
              )}
            />
          )}
          {sentEmails.loading || sentEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Sent Messages"
              current={sentEmails.data.count}
              previousPercentage={roundPercent(
                sentEmails.data.count,
                sentEmailsPrevious.data.count
              )}
            />
          )}
          {false && (
            <div className="p-3 border-l">
              <div>
                <div>Recipients</div>
                <div className="font-medium text-xs text-gray-400 ">
                  Feb 20 - Mar19, 2022
                </div>
              </div>
              <div className="flex flex-row items-center mt-4">
                <div className="text-lg">{state.stats.to.length}</div>
                <div className="flex flex-row text-sm ml-1 bg-green-200 items-center rounded-3xl ">
                  <ArrowUpCircleIcon className="w-5 text-green-600" />
                  <div className="text-sm text-green-600 pr-1">
                    {(state.stats.to.length * 100) / state.stats.to.length} %
                  </div>
                </div>
              </div>
              <div className="border-2">
                {receivedHistogram && (
                  <EmailDashboardDos data={sendedHistogram} type="line" />
                )}
              </div>
            </div>
          )}
          {false && (
            <div className="p-3 border-l">
              <div>
                <div>Senders</div>
                <div className="font-medium text-xs text-gray-400 ">
                  Feb 20 - Mar19, 2022
                </div>
              </div>
              <div className="flex flex-row items-center mt-4">
                <div className="text-lg">{state.stats.from.length}</div>
                <div className="flex flex-row text-sm ml-1 bg-green-200 items-center rounded-3xl ">
                  <ArrowUpCircleIcon className="w-5 text-green-600" />
                  <div className="text-sm text-green-600 pr-1">
                    {(state.stats.from.length * 100) / state.stats.from.length}{" "}
                    %
                  </div>
                </div>
              </div>
              <div className="border-2">
                {receivedHistogram && (
                  <EmailDashboardDos data={receivedHistogram} type="line" />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="px-3 py-4 flex flex-row justify-between border">
          <div className="flex flex-row gap-2 items-center">
            <div>
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              all stores
            </div>
            <div>
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              apple music
            </div>
            <div>
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              spotify
            </div>
            <div>
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              dezzwer
            </div>
            <div>
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              otro
            </div>
          </div>
          <div>
            <button className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">
              Download Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg mt-3 flex flex-row">
        <div className="flex flex-col basis-2/3">
          <div className="border-y p-3 flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <div className="font-medium border-b-2 border-blue-600">
                Top Streaming Tracks
              </div>
              <div className="font-medium text-gray-400 ml-3">
                Top Downloaded Tracks
              </div>
            </div>
            <div className="">
              <button className="px-5 py-2.5 text-sm leading-5 rounded-md font-semibold border-2">
                This Month
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                <tr>
                  {headersTopByAddress.map((header, index) => {
                    return (
                      <th
                        className="border-b font-medium p-3 text-slate-400 text-left"
                        key={index}
                      >
                        {header.display}
                      </th>
                    );
                  })}
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                {topInteractionsByAddress.data.map((interaction, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-b border-slate-100 px-3 text-slate-500">
                        {interaction.email_address}
                      </td>
                      <td className="border-b border-slate-100 px-3 text-slate-500">
                        {interaction.sent_messages +
                          interaction.received_messages}
                      </td>
                      <td className="border-b border-slate-100 px-3 text-slate-500">
                        {interaction.sent_messages}
                      </td>
                      <td className="border-b border-slate-100 px-3 text-slate-500">
                        {interaction.received_messages}
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="py-5 flex justify-center font-medium text-gray-400">
            VIEW ALL TOP TRACKS
          </div>
        </div>

        <div className="border px-3 pt-3 flex flex-col basis-1/3">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <div className="font-medium">Top Artists</div>
            </div>
            <div className="">
              <button className="px-5 py-2.5 text-sm leading-5 rounded-md font-semibold border-2">
                This Month
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                <tr>
                  {headersTopByDomain.map((header, index) => {
                    return (
                      <th
                        className="border-b font-medium text-slate-400 "
                        key={index}
                      >
                        {header.display}
                      </th>
                    );
                  })}
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                {topInteractionsByDomain.data.map((interaction, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-b border-slate-100 text-slate-500">
                        {interaction.email_address}
                      </td>
                      <td className="border-b border-slate-100 text-slate-500">
                        {interaction.sent_messages +
                          interaction.received_messages}
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="py-5 flex justify-center font-medium text-gray-400 grow">
            <div className="self-end">VIEW ALL TOP ARTISTS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
