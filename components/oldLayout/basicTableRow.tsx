import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppWrapper";

const BasicTableRow = (props) => {
  const { row } = props;
  const [data, setData] = React.useState(() => []);
  //const [headers, error1] = useGetHeaders(row.original.id);
  const [headers, error1] = React.useState(() => []);

  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (null != headers) {
      dispatch({ type: "add_headers", value: headers });
      dispatch({ type: "add_stats_label", value: headers });
      dispatch({ type: "add_stats_fromto", value: headers });
    }
  }, [headers]);

  useEffect(() => {
    if (!state || {} == state.headers) return;
    if (undefined != state?.headers[row.original.id]) {
      const data = state.headers[row.original.id].payload.headers;
      const item_order = ["Delivered-To", "Date", "From", "Subject", "To"];
      data.sort(
        (a, b) => item_order.indexOf(a.name) - item_order.indexOf(b.name)
      );
      //console.log(data);
      setData(data);
    }
  }, [state.headers]);

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
