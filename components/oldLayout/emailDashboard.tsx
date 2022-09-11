import { useAppContext } from "../../context/AppWrapper";
import React, { useEffect, useState } from "react";
import EmailDashboardDos from "./emailDashboardDos";
import {
  getReceivedEmailsHistogram,
  getSendedEmailsHistogram,
} from "../../lib/hooks-stats";

const EmailDashboard = (props) => {
  const [state, dispatch] = useAppContext();
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [isChartLoaded, setIsChartLoaded] = useState<boolean>(false);
  const [receivedHistogram, setReceivedHistogram] = useState(null);
  const [sendedHistogram, setSendedHistogram] = useState(null);

  useEffect(() => {
    setHasMounted(true);
  }, [props]);

  useEffect(() => {
    if (hasMounted && !isChartLoaded) {
      setIsChartLoaded(true);
      setReceivedHistogram(getReceivedEmailsHistogram(state));
      setSendedHistogram(getSendedEmailsHistogram(state));
    }
  }, [hasMounted]);

  return (
    <>
      <p>oli</p>
      {state.stats && (
        <div style={{ fontSize: "10px" }}>
          <div>
            <h2>total messages reveived: {state.labels.length}</h2>
          </div>
          <p>Labels:</p>
          {Object.entries(state.stats.labels).map(([key, value]) => {
            return (
              <div key={key}>
                <h2>
                  {key}: {value.length}
                </h2>
              </div>
            );
          })}
          <p>From and to:</p>
          {Object.entries(state.stats).map(([key, value]) => {
            return (
              <div key={key}>
                <h2>
                  {key}: {value.length}
                </h2>
              </div>
            );
          })}
          {receivedHistogram && <EmailDashboardDos data={receivedHistogram} />}
          {sendedHistogram && <EmailDashboardDos data={sendedHistogram} />}
        </div>
      )}
    </>
  );
};

export default EmailDashboard;
