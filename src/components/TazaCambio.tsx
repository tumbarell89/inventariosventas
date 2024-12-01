import React, { useState, useEffect } from 'react';
import { fetchTazasCambio, createTazaCambio, updateTazaCambio, deleteTazaCambio } from '../lib/tazaCambioQueries';

export default function TazaCambio() {
  const [tazas, setTazas] = useState([]);
  const [newTaza, setNewTaza] = useState({ moneda: '', valor: 0 });

  useEffect(() => {
    fetchTazasCambio().then(setTazas);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdTaza = await createTazaCambio(newTaza);
    setTazas([...tazas, createdTaza]);
    setNewTaza({ moneda: '', valor: 0 });
  };

  const handleUpdate = async (id, updatedTaza) => {
    const updated = await updateTazaCambio(id, updatedTaza);
    setTazas(tazas.map(taza => taza.id === id ? updated : taza));
  };

  const handleDelete = async (id) => {
    await deleteTazaCambio(id);
    setTazas(tazas.filter(taza => taza.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tazas de Cambio</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Moneda"
          value={newTaza.moneda}
          onChange={(e) => setNewTaza({...newTaza, moneda: e.target.value})}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Valor"
          value={newTaza.valor}
          onChange={(e) => setNewTaza({...newTaza, valor: parseFloat(e.target.value)})}
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Agregar</button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Moneda</th>
            <th className="py-2 px-4 border-b">Valor</th>
            <th className="py-2 px-4 border-b">Fecha de Actualización</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tazas.map((taza) => (
            <tr key={taza.id}>
              <td className="py-2 px-4 border-b">{taza.id}</td>
              <td className="py-2 px-4 border-b">{taza.tazamoneda.moneda}</td>
              <td className="py-2 px-4 border-b">{taza.tazamoneda.valor}</td>
              <td className="py-2 px-4 border-b">{new Date(taza.fechaActualizacion).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleUpdate(taza.id, { ...taza.tazamoneda })} className="mr-2 p-1 bg-yellow-500 text-white rounded">Editar</button>
                <button onClick={() => handleDelete(taza.id)} className="p-1 bg-red-500 text-white rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

