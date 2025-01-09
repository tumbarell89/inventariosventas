import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateTazasCambio } from '../../lib/api';

interface EditTazaCambioModalProps {
  monedas: string[];
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditTazaCambioModal: React.FC<EditTazaCambioModalProps> = ({ monedas, isOpen, onClose, onSave }) => {
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

  const handleSubmit = async () => {
    try {
      await updateTazasCambio(tasas);
      onSave();
      onClose();
    } catch (error) {
      console.error('Error al actualizar las tasas de cambio:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[80%] bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Editar Tasas de Cambio</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">
                  Desde / Hacia
                </th>
                {monedas.map(moneda => (
                  <th key={moneda} className="px-6 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">
                    {moneda}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monedas.map(monedaOrigen => (
                <tr key={monedaOrigen}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {monedaOrigen}
                  </td>
                  {monedas.map(monedaDestino => (
                    <td key={`${monedaOrigen}-${monedaDestino}`} className="px-6 py-4 whitespace-nowrap">
                      {monedaOrigen === monedaDestino ? (
                        '1'
                      ) : (
                        <Input
                          type="number"
                          step="0.0001"
                          value={tasas[monedaOrigen]?.[monedaDestino] || ''}
                          onChange={(e) => handleChange(monedaOrigen, monedaDestino, e.target.value)}
                          className="w-full"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="mr-2">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTazaCambioModal;

