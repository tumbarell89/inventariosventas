import React, { useState, useEffect } from 'react';
import { fetchTazasCambio } from '../../lib/api';

interface TazaCambioMatrixProps {
  monedas: string[];
}

const TazaCambioMatrix: React.FC<TazaCambioMatrixProps> = ({ monedas }) => {
  const [tasas, setTasas] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    loadTasas();
  }, [monedas]);

  const loadTasas = async () => {
    const fetchedTasas = await fetchTazasCambio();
    setTasas(fetchedTasas);
  };

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="border p-2"></th>
          {monedas.map(moneda => (
            <th key={moneda} className="border p-2">{moneda}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {monedas.map(monedaOrigen => (
          <tr key={monedaOrigen}>
            <th className="border p-2">{monedaOrigen}</th>
            {monedas.map(monedaDestino => (
              <td key={`${monedaOrigen}-${monedaDestino}`} className="border p-2">
                {monedaOrigen === monedaDestino ? '1' : (tasas[monedaOrigen]?.[monedaDestino] || '-')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TazaCambioMatrix;

