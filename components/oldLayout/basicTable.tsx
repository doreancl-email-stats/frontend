import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import BasicTableRow from "./basicTableRow";
import { useAppContext } from "../../context/AppWrapper";
import { useGetMessages } from "../../lib/hooks-google";

type EmailRow = {
  id: string;
  "Delivered-To": string;
  Date: string;
  From: number;
  Subject: number;
  To: string;
};

const columnHelper = createColumnHelper<EmailRow>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Delivered-To", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Date", {
    header: () => "Date",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("From", {
    header: () => "From",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Subject", {
    header: () => <span>Subject</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("To", {
    header: "To",
    footer: (info) => info.column.id,
  }),
];

const BasicTable = () => {
  const [data, setData] = React.useState(() => []);
  //const [messages, error1] = React.useState(() => []);
  const [messages, error1] = useGetMessages();
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (messages && messages?.length > 0) {
      console.log("dispatch-add_messages_list", { type: "add_messages_list", value: messages });
      dispatch({ type: "add_messages_list", value: messages });
    }
  }, [messages]);

  useEffect(() => {
    if (!state || !state.messages_list) return;
    if (state?.messages_list.length > 0) {
      setData(state.messages_list);
    }
  }, [state]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <h2>Basict Table</h2>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            table
              .getRowModel()
              .rows.map((row) => <BasicTableRow key={row.id} row={row} />)}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default BasicTable;
