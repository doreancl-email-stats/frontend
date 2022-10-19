import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppWrapper";
import { useGetMessage } from "../../lib/hooks-google";

const BasicTableRow = (props) => {
  const { row } = props;
  const [data, setData] = React.useState(() => []);
  const [headers, error1] = useGetMessage(row.original.id);
  //const [headers, error1] = React.useState(() => []);

  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (null != headers) {
      dispatch({ type: "add_message", value: headers });
      //dispatch({ type: "add_stats_label", value: headers });
      //dispatch({ type: "add_stats_fromto", value: headers });

      const data = headers.payload.headers;
      const item_order = ["Delivered-To", "Date", "From", "Subject", "To"];
      data.sort(
        (a, b) => item_order.indexOf(a.name) - item_order.indexOf(b.name)
      );
      setData(data);
    }
  }, [headers]);

  useEffect(() => {
    if (!state || undefined == state.messages) return;
    if (undefined != state?.messages[row.original.id]) {
      const data = state.messages[row.original.id].payload.headers;
      const item_order = ["Delivered-To", "Date", "From", "Subject", "To"];
      data.sort(
        (a, b) => item_order.indexOf(a.name) - item_order.indexOf(b.name)
      );
      setData(data);
    }
  }, [state]);

  return (
    <>
      <tr key={row.id}>
        <td>{row.original.id}</td>
        {data.map((value, key) => {
          return <td key={key}>{value.value}</td>;
        })}
      </tr>
    </>
  );
};

export default BasicTableRow;
