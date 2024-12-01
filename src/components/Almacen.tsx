import React, { useState, useEffect } from 'react';
import { fetchProductos, fetchOperacionesEntrada } from '../lib/almacenQueries';

export default function Almacen() {
  const [productos, setProductos] = useState([]);
  const [operaciones, setOperaciones] = useState([]);

  useEffect(() => {
    fetchProductos().then(setProductos);
    fetchOperacionesEntrada().then(setOperaciones);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Productos en Almacén</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {/* {productos.map((producto) => (
              <tr key={producto!.id}>
                <td className="py-2 px-4 border-b">{producto.id}</td>
                <td className="py-2 px-4 border-b">{producto.nombre}</td>
                <td className="py-2 px-4 border-b">{producto.cantidad}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Operaciones de Entrada</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {/* {operaciones.map((operacion) => (
              <tr key={operacion.id}>
                <td className="py-2 px-4 border-b">{operacion.id}</td>
                <td className="py-2 px-4 border-b">{operacion.producto.nombre}</td>
                <td className="py-2 px-4 border-b">{operacion.cantidad}</td>
                <td className="py-2 px-4 border-b">{new Date(operacion.fecha).toLocaleString()}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

