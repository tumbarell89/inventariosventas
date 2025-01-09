import React from 'react';

interface MonedasTableProps {
  monedas: { id: number; denominacion: string }[];
}

const MonedasTable: React.FC<MonedasTableProps> = ({ monedas }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">
              Denominación
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {monedas.map(moneda => (
            <tr key={moneda.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {moneda.denominacion}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonedasTable;

