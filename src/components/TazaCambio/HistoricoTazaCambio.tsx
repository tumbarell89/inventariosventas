import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { fetchHistoricoTazasCambio } from '../../lib/api';
import TazaCambioMatrixModal from './TazaCambioMatrixModal';

interface HistoricoEntry {
  id: number;
  fecha: string;
  datos: Record<string, Record<string, number>>;
}

const HistoricoTazaCambio: React.FC = () => {
  const [historico, setHistorico] = useState<HistoricoEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<HistoricoEntry | null>(null);

  useEffect(() => {
    loadHistorico();
  }, []);

  const loadHistorico = async () => {
    try {
      const data = await fetchHistoricoTazasCambio();
      setHistorico(data);
    } catch (error) {
      console.error('Error al cargar el histórico:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Histórico de Tasas de Cambio</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {historico.map(entry => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(entry.fecha).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button onClick={() => setSelectedEntry(entry)}>
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEntry && (
        <TazaCambioMatrixModal
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          tazaCambio={selectedEntry.datos}
          fecha={selectedEntry.fecha}
        />
      )}
    </div>
  );
};

export default HistoricoTazaCambio;
