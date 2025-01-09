import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import TazaCambioMatrixModal from './TazaCambioMatrixModal';

interface HistoricoEntry {
  id: number;
  fecha: string;
  datos: Record<string, Record<string, number>>;
}

interface HistoricoTazaCambioProps {
  historico: HistoricoEntry[];
}

const HistoricoTazaCambio: React.FC<HistoricoTazaCambioProps> = ({ historico }) => {
  const [selectedEntry, setSelectedEntry] = useState<HistoricoEntry | null>(null);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-purple-800 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-purple-800 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {historico.map(entry => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(entry.fecha).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button 
                    onClick={() => setSelectedEntry(entry)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
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