import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import HeroChartElement from "./hero-chart-element";
import { useAppContext } from "../../context/AppWrapper";
import EmailDashboardDos from "../oldLayout/emailDashboardDos";
import {
  onGetPromotionsEmails,
  onGetReceivedEmails,
  onGetReceivedEmailsHistogram,
  onGetSentEmails,
  onGetSentEmailsHistogram,
  onGetTopInteractions,
  onGetUnreadEmails,
} from "../../lib/hooks-stats";
import { getSession } from "../../lib/hooks-users";

const bla = {
  loading: true,
  data: {
    count: 0,
  },
  error: null,
};

const ble = {
  loading: true,
  data: [],
  error: null,
};

const headersTopByAddress = [
  { name: "email_address", display: "Email" },
  { name: "interactions", display: "Interactions" },
  { name: "sent_messages", display: "Sent" },
  { name: "received_messages", display: "Received" },
];
const headersTopByDomain = [
  { name: "domain", display: "Domain" },
  { name: "interactions", display: "Interactions" },
];

export default function Dashboard() {
  const [state, dispatch] = useAppContext();
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
  const [receivedEmailsHistogram, setReceivedEmailsHistogram] = useState(ble);
  const [sentEmailsHistogram, setSentEmailsHistogram] = useState(ble);
  const [session, error] = useState(null);

  useEffect(() => {
    if (!state.timestamps) {
      return;
    }
    (async () => {
      if (!state.timestamps) {
        return;
      }
      if (!state.timestamps.current) {
        return;
      }
      if (!state.timestamps.previous) {
        return;
      }

      const current = state.timestamps.current;
      const previous = state.timestamps.previous;

      console.table({ current, previous });
      setUnreadEmails(await onGetUnreadEmails(current));
      setUnreadEmailsPrevious(await onGetUnreadEmails(previous));

      setPromotionsEmails(await onGetPromotionsEmails(current));
      setPromotionsEmailsPrevious(await onGetPromotionsEmails(previous));

      setReceivedEmails(await onGetReceivedEmails(current));
      setReceivedEmailsPrevious(await onGetReceivedEmails(previous));

      setSentEmails(await onGetSentEmails(current));
      setSentEmailsPrevious(await onGetSentEmails(previous));

      setTopInteractionsByAddress(
        await onGetTopInteractions({
          ...current,
          groupBy: "address",
        })
      );
      setTopInteractionsByDomain(
        await onGetTopInteractions({
          ...current,
          groupBy: "domain",
        })
      );
      setReceivedEmailsHistogram(
        await onGetReceivedEmailsHistogram({
          ...current,
          unit: "days",
        })
      );
      setSentEmailsHistogram(
        await onGetSentEmailsHistogram({
          ...current,
          unit: "days",
        })
      );
    })();
  }, [state.timestamps]);

  useEffect(() => {
    (async () => {
      const [session, error] = await getSession({});

      console.log('Dashboard', { session, error });
    })();
  }, []);

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
        <div className="grid grid-cols-4 border-r border-b">
          {unreadEmails.loading || unreadEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Unread Messages"
              current={unreadEmails.data.count}
              previous={unreadEmailsPrevious.data.count}
            ></HeroChartElement>
          )}
          {promotionsEmails.loading || promotionsEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Promotion Messages"
              current={promotionsEmails.data.count}
              previous={promotionsEmailsPrevious.data.count}
            ></HeroChartElement>
          )}
          {receivedEmails.loading || receivedEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Some Messages"
              current={receivedEmails.data.count}
              previous={receivedEmailsPrevious.data.count}
            ></HeroChartElement>
          )}
          {sentEmails.loading || sentEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Other Messages"
              current={sentEmails.data.count}
            ></HeroChartElement>
          )}
        </div>
      </div>

      <div className="bg-white shadow-lg flex flex-col mt-3">
        <div className="grid grid-cols-2 border-r">
          {receivedEmails.loading || receivedEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Received Messages"
              current={receivedEmails.data.count}
              previous={receivedEmailsPrevious.data.count}
            >
              {false === receivedEmailsHistogram.loading && (
                <EmailDashboardDos
                  data={receivedEmailsHistogram.data}
                  type="area"
                  timestamps={state.timestamps}
                />
              )}
            </HeroChartElement>
          )}
          {sentEmails.loading || sentEmails.error ? (
            <HeroChartElement />
          ) : (
            <HeroChartElement
              title="Sent Messages"
              current={sentEmails.data.count}
              previous={sentEmailsPrevious.data.count}
            >
              {false === sentEmailsHistogram.loading && (
                <EmailDashboardDos
                  data={sentEmailsHistogram.data}
                  type="area"
                  timestamps={state.timestamps}
                />
              )}
            </HeroChartElement>
          )}
        </div>

        {/*
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
        */}
      </div>

      <div className="bg-white shadow-lg mt-3 flex flex-row">
        <div className="flex flex-col basis-2/3">
          <div className="border-y p-3 flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <div className="font-medium border-b-2 border-blue-600">
                Top addresses
              </div>
              <div className="hidden font-medium text-gray-400 ml-3">
                Top sended emails
              </div>
            </div>
            <div className="">
              <button className="px-5 py-2.5 text-sm leading-5 rounded-md font-semibold border-2 cursor-not-allowed">
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
          <div className="py-5 flex justify-center font-medium text-gray-400 cursor-not-allowed">
            VIEW ALL TOP ADDRESSES
          </div>
        </div>

        <div className="border px-3 pt-3 flex flex-col basis-1/3">
          <div className="flex flex-row  justify-between items-center">
            <div className="flex flex-row">
              <div className="font-medium">Top Domains</div>
            </div>
            <div className=""></div>
          </div>
          <div className="flex flex-col mt-8">
            <div>
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr>
                    {headersTopByDomain.map((header, index) => {
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
          <div className="py-5 flex justify-center font-medium text-gray-400 grow cursor-not-allowed">
            <div className="self-end">VIEW ALL TOP DOMAINS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
