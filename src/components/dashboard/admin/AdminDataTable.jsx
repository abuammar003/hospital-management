
"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function AdminDataTable({
  title,
  description,
  data = [],
  columns = [],
  searchPlaceholder = "Search...",
  statusField,
  trueLabel = "Active",
  falseLabel = "Inactive",
}) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <div className="mb-5 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 md:max-w-md">
        <Search size={19} className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-5 py-4 font-semibold">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id ?? index} className="hover:bg-slate-50">
                    {columns.map((column) => (
                      <td key={column.key} className="px-5 py-4 text-slate-700">
                        {column.key === statusField ? (
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              item[statusField]
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {item[statusField] ? trueLabel : falseLabel}
                          </span>
                        ) : (
                          item[column.key] ?? "—"
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          Showing {filteredData.length} of {data.length} records
        </div>
      </div>
    </div>
  );
}
