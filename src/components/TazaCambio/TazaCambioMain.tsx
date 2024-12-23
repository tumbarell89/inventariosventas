import React, { useState, useEffect } from 'react';
import TazaCambioMatrix from './TazaCambioMatrix';
import TazaCambioForm from './TazaCambioForm';
import TazaCambioHistory from './TazaCambioHistory';
import { fetchMonedas, addMoneda } from '../../lib/api';

const TazaCambioMain: React.FC = () => {
  const [monedas, setMonedas] = useState<string[]>([]);
  const [newMoneda, setNewMoneda] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMonedas();
  }, []);

  const loadMonedas = async () => {
    try {
      const fetchedMonedas = await fetchMonedas();
      setMonedas(fetchedMonedas.map(m => m.denominacion));
      setError(null);
    } catch (err) {
      setError('Error al cargar las monedas');
      console.error(err);
    }
  };

  const handleAddMoneda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMoneda) {
      try {
        await addMoneda(newMoneda);
        setNewMoneda('');
        await loadMonedas();
        setError(null);
      } catch (err) {
        setError('Error al añadir la moneda');
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Taza de Cambio</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleAddMoneda} className="mb-4">
        <input
          type="text"
          value={newMoneda}
          onChange={(e) => setNewMoneda(e.target.value)}
          placeholder="Nueva denominación de moneda"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Añadir Moneda</button>
      </form>

      <TazaCambioMatrix monedas={monedas} />
      
      <button 
        onClick={() => setShowForm(true)} 
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Editar Tasas de Cambio
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <TazaCambioForm 
              monedas={monedas} 
              onClose={() => setShowForm(false)}
              onSave={() => {
                setShowForm(false);
                // Aquí deberías actualizar la matriz y el historial
              }}
            />
          </div>
        </div>
      )}

      <TazaCambioHistory />
    </div>
  );
};

export default TazaCambioMain;

