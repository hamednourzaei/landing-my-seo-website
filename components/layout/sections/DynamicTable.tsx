
import React from "react";
import { FAQProps } from "@/components/layout/sections/data/privacy-policy"; // Adjust the path based on your file structure

interface DynamicTableProps {
  tableData: FAQProps["table"];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ tableData }) => (
  <div className="overflow-x-auto mb-6">
    <table className="w-full text-sm sm:text-base border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">دسته‌بندی</th>
          <th className="border p-2 text-left">نمونه‌ها</th>
          <th className="border p-2 text-left">جمع‌آوری شده</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border p-2">{row.category}</td>
            <td className="border p-2">{row.examples}</td>
            <td className="border p-2">{row.collected}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DynamicTable;
