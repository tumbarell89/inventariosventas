import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchMonedas, addMoneda, deleteMoneda, fetchLatestTazaCambio, fetchHistoricoTazasCambio } from '../../lib/api';
import MonedasTable from './MonedasTable';
import TazaCambioMatrix from './TazaCambioMatrix';
import HistoricoTazaCambio from './HistoricoTazaCambio';
import DeleteMonedaModal from './DeleteMonedaModal';
import EditTazaCambioModal from './EditTazaCambioModal';

const TazaCambioMain: React.FC = () => {
  const [monedas, setMonedas] = useState<{ id: number; denominacion: string }[]>([]);
  const [newMoneda, setNewMoneda] = useState('');
  const [latestTazaCambio, setLatestTazaCambio] = useState<Record<string, Record<string, number>>>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historico, setHistorico] = useState<HistoricoEntry[]>([]);

  interface HistoricoEntry {
    id: number;
    fecha: string;
    datos: Record<string, Record<string, number>>;
  }
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [fetchedMonedas, fetchedLatestTazaCambio] = await Promise.all([
        fetchMonedas(),
        fetchLatestTazaCambio()
      ]);
      setMonedas(fetchedMonedas);
      setLatestTazaCambio(fetchedLatestTazaCambio);
      loadHistorico();
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    }
  };

  const loadHistorico = async () => {
    try {
      const data = await fetchHistoricoTazasCambio();
      setHistorico(data);
    } catch (error) {
      console.error('Error al cargar el histórico:', error);
    }
  };

  const handleAddMoneda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMoneda) {
      try {
        await addMoneda(newMoneda);
        setNewMoneda('');
        await loadData();
      } catch (err) {
        setError('Error al añadir la moneda');
        console.error(err);
      }
    }
  };

  const handleDeleteMoneda = async (id: number) => {
    try {
      await deleteMoneda(id);
      await loadData();
    } catch (err) {
      setError('Error al eliminar la moneda');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasa de Cambio</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex space-x-2 mb-4">
        <form onSubmit={handleAddMoneda} className="flex-grow">
          <div className="flex">
            <Input
              type="text"
              value={newMoneda}
              onChange={(e) => setNewMoneda(e.target.value)}
              placeholder="Nueva denominación de moneda"
              className="mr-2"
            />
            <Button type="submit">Añadir Moneda</Button>
          </div>
        </form>
        <Button onClick={() => setShowDeleteModal(true)} variant="destructive">
          Eliminar Moneda
        </Button>
        <Button onClick={() => setShowEditModal(true)} variant="outline">
          Editar Tasa de Cambio
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <MonedasTable monedas={monedas} />
        <TazaCambioMatrix tazaCambio={latestTazaCambio} />
      </div>

      <HistoricoTazaCambio historico={historico} />

      <DeleteMonedaModal
        monedas={monedas}
        onDelete={handleDeleteMoneda}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />

      <EditTazaCambioModal
        monedas={monedas.map(m => m.denominacion)}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={() => {
          loadData();
          loadHistorico();
        }}
      />
    </div>
  );
};

export default TazaCambioMain;