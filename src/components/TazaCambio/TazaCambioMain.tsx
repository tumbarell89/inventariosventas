import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <div className="container mx-auto p-4 bg-gradient-to-br from-blue-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Tasa de Cambio</h1>
      
      {error && <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">{error}</div>}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestión de Monedas</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMoneda} className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          value={newMoneda}
          onChange={(e) => setNewMoneda(e.target.value)}
          placeholder="Nueva denominación de moneda"
          className="flex-grow"
        />
        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">Añadir Moneda</Button>
          </form>
          <div className="flex space-x-2">
        <Button onClick={() => setShowDeleteModal(true)} variant="destructive" className="bg-red-500 hover:bg-red-600">
          Eliminar Moneda
        </Button>
        <Button onClick={() => setShowEditModal(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
          Editar Tasa de Cambio
        </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Monedas Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <MonedasTable monedas={monedas} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Matriz de Tasa de Cambio</CardTitle>
          </CardHeader>
          <CardContent>
            <TazaCambioMatrix tazaCambio={latestTazaCambio} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Tasas de Cambio</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoricoTazaCambio historico={historico} />
        </CardContent>
      </Card>

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