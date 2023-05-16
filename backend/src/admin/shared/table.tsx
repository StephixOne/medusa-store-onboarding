import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { RestockNotification } from "../../models/restock-notification";

type Props = {
  restockNotification: RestockNotification[];
};

const columns: ColumnDef<RestockNotification>[] = [
  {
    id: "variant",
    header: () => <div className="text-left flex items-center">Variant</div>,
    accessorFn: (row) => row.variant,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="my-1.5 mr-4 flex h-[40px] w-[30px] items-center">
            <img
              src={row.original.variant.product.thumbnail}
              alt=""
              className="rounded-sm h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="font-semibold text-gray-900">
              {row.original.variant.title}
            </p>
            {row.original.variant.sku && (
              <p className="text-gray-500 text-[10px]">
                {row.original.variant.sku}
              </p>
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: "emails",
    header: () => (
      <div className="text-right flex items-center justify-end">
        Subscribers
      </div>
    ),
    accessorFn: (row) => row.emails,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-y-1 text-right">
          <p className="text-gray-900">{row.original.emails?.length}</p>
        </div>
      );
    },
  },
];

const Table = ({ restockNotification }: Props) => {
  const table = useReactTable({
    data: restockNotification,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full">
      <thead className="border-y border-gray-200">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="text-[12px] leading-5 font-semibold text-gray-500 h-[40px]"
              >
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
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b border-gray-200">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-[12px] leading-5">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
