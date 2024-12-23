import React, { useState, useEffect } from 'react';
import { fetchHistoricoTazasCambio } from '../../lib/api';

interface HistoricoEntry {
  fecha: string;
  datos: Record<string, Record<string, number>>;
}

const TazaCambioHistory: React.FC = () => {
  const [historico, setHistorico] = useState<HistoricoEntry[]>([]);

  useEffect(() => {
    loadHistorico();
  }, []);

  const loadHistorico = async () => {
    const fetchedHistorico = await fetchHistoricoTazasCambio();
    setHistorico(fetchedHistorico);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Historial de Cambios</h2>
      {historico.map((entry, index) => (
        <div key={index} className="mb-6 border p-4 rounded">
          <h3 className="font-bold mb-2">Fecha: {new Date(entry.fecha).toLocaleString()}</h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2"></th>
                {Object.keys(entry.datos).map(moneda => (
                  <th key={moneda} className="border p-2">{moneda}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(entry.datos).map(([monedaOrigen, tasas]) => (
                <tr key={monedaOrigen}>
                  <th className="border p-2">{monedaOrigen}</th>
                  {Object.entries(tasas).map(([monedaDestino, valor]) => (
                    <td key={`${monedaOrigen}-${monedaDestino}`} className="border p-2">
                      {monedaOrigen === monedaDestino ? '1' : valor}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TazaCambioHistory;

