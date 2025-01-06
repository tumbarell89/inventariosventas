import React from 'react';

interface MonedasTableProps {
  monedas: { id: number; denominacion: string }[];
}

const MonedasTable: React.FC<MonedasTableProps> = ({ monedas }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Monedas
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              {monedas.map(moneda => moneda.denominacion).join(', ')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MonedasTable;
