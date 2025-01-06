import React from 'react';

interface TazaCambioMatrixProps {
  tazaCambio: Record<string, Record<string, number>>;
}

const TazaCambioMatrix: React.FC<TazaCambioMatrixProps> = ({ tazaCambio }) => {
  const monedas = Object.keys(tazaCambio);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Desde / Hacia
            </th>
            {monedas.map(moneda => (
              <th key={moneda} className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {moneda}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monedas.map(monedaOrigen => (
            <tr key={monedaOrigen}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {monedaOrigen}
              </td>
              {monedas.map(monedaDestino => (
                <td key={`${monedaOrigen}-${monedaDestino}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tazaCambio[monedaOrigen]?.[monedaDestino] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TazaCambioMatrix;
