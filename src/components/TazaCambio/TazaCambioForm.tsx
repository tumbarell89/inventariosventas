import React, { useState } from 'react';
import { updateTazasCambio } from '../../lib/api';

interface TazaCambioFormProps {
  monedas: string[];
  onClose: () => void;
  onSave: () => void;
}

const TazaCambioForm: React.FC<TazaCambioFormProps> = ({ monedas, onClose, onSave }) => {
  const [tasas, setTasas] = useState<Record<string, Record<string, number>>>({});

  const handleChange = (monedaOrigen: string, monedaDestino: string, valor: string) => {
    setTasas(prevTasas => ({
      ...prevTasas,
      [monedaOrigen]: {
        ...prevTasas[monedaOrigen],
        [monedaDestino]: parseFloat(valor) || 0
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTazasCambio(tasas);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Editar Tasas de Cambio</h2>
      <table className="w-full border-collapse border mb-4">
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
                  {monedaOrigen === monedaDestino ? (
                    '1'
                  ) : (
                    <input
                      type="number"
                      step="0.0001"
                      value={tasas[monedaOrigen]?.[monedaDestino] || ''}
                      onChange={(e) => handleChange(monedaOrigen, monedaDestino, e.target.value)}
                      className="w-full p-1 border"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="bg-gray-300 text-black p-2 rounded mr-2">Cancelar</button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Guardar</button>
      </div>
    </form>
  );
};

export default TazaCambioForm;

