import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import BasicTableRow from "./basicTableRow";
import { useAppContext } from "../../context/AppWrapper";

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
  const [labels, error1] = React.useState(() => []);
  //const [labels, error1] = useGetLabels();
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (labels && labels?.length > 0) {
      dispatch({ type: "add_labels", value: labels });
    }
  }, [labels]);

  useEffect(() => {
    if (!state || !state.labels) return;
    if (state?.labels.length > 0) {
      setData(state.labels);
    }
  }, [state.labels]);

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
