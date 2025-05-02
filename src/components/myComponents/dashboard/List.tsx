import React from "react";

import { listBiggestIndicatorsProps } from "@/data/listBiggestIndicators";

interface ListProps {
  items: listBiggestIndicatorsProps[];
}

export function List({ items }: ListProps) {
  return (
    <div className="max-h-42 overflow-y-auto bg-[#F6F8FA] py-1 px-3 rounded-2xl">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left">Top 5 maiores indicadores</th>
            <th className="p-2 text-left">Quantidade</th>
            <th className="p-2 text-left">Convertidos</th>
            <th className="p-2 text-left">Usuário desde</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="even:bg-[#fff]">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{item.converted}</td>
              <td className="p-2">{item.userAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
