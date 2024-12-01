import { useState, useEffect } from 'react';
import type { VentaFinalizada, User } from '../lib/supabasenegocio';
import { delVenta, listarOrdenesconVendedor } from '../lib/repositorios';
import { db } from '../lib/db';

interface ListaVentasFinalizadasProps {
  updateFlag: boolean;
  isOffline: boolean;
}

export default function ListaVentasFinalizadas({ updateFlag = false, isOffline = false }: ListaVentasFinalizadasProps) {
  const [ventas, setVentas] = useState<VentaFinalizada[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchVentas();
  }, [updateFlag, isOffline]);

  async function fetchVentas() {
    setIsLoading(true);
    setError(null);
    try {
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user) {
        setUser(user);
      }

      let ventasData: VentaFinalizada[];

      if (isOffline) {
        // Fetch from IndexedDB
        ventasData = await db.ventas.toArray();
      } else {
        // Fetch from Supabase
        let negocio_id = user.es_admin ? user.id : user.admin_id;
        const { data, error } = await listarOrdenesconVendedor(negocio_id);
        if (error) throw error;
        ventasData = data || [];
      }

      // Sort ventas by date, most recent first
      ventasData.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      setVentas(ventasData);
    } catch (err) {
      console.error('Error fetching ventas:', err);
      setError('Error al cargar las ventas finalizadas. Por favor, intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteVenta(id: number) {
    if (!user?.es_admin) return;

    try {
      if (isOffline) {
        // Delete from IndexedDB
        await db.ventas.delete(id);
      } else {
        // Delete from Supabase
        const { error } = await delVenta(id);
        if (error) throw error;
      }

      // Remove the deleted venta from the local state
      setVentas(ventas.filter(venta => venta.id !== id));
    } catch (err) {
      console.error('Error deleting venta:', err);
      setError('Error al eliminar la venta. Por favor, intente de nuevo.');
    }
  }

  if (isLoading) return <div className="bg-white rounded-lg shadow p-4">Cargando ventas finalizadas...</div>;
  if (error) return <div className="bg-white rounded-lg shadow p-4 text-red-500">Error: {error}</div>;
  if (ventas.length === 0) return <div className="bg-white rounded-lg shadow p-4">No hay ventas finalizadas.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-4">
        {ventas.map((venta, index) => (
          <div key={venta.id} className="border rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold h1responsivetext">Venta #{ventas.length - index}</h3>
              {user?.es_admin && (
                <button 
                  onClick={() => {
                    if (window.confirm('¿Está seguro de que desea eliminar esta venta?')) {
                      deleteVenta(venta.id!);
                    }
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                >
                  Eliminar
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">Fecha: {new Date(venta.fecha).toLocaleString()}</p>
            <div className="overflow-x-auto">
              <table className="w-full mb-2">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Producto</th>
                    <th className="p-2 text-right">Cantidad</th>
                    <th className="p-2 text-right">Precio</th>
                    <th className="p-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {venta.items.productos.map((item, index2) => (
                    <tr key={index2} className="border-b">
                      <td className="p-2">{item.producto}</td>
                      <td className="p-2 text-right">{item.cantidad}</td>
                      <td className="p-2 text-right">${item.precio.toFixed(2)}</td>
                      <td className="p-2 text-right">${(item.cantidad * item.precio).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 bg-gray-100 rounded-lg p-6 shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <p className="font-semibold text-gray-600">Comprobante:</p>
                  <p className="font-bold text-yellow-500">{venta.items.comprobante || 'No es venta transferencia'}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="font-semibold text-gray-600">Vendedor:</p>
                  <p className="font-bold text-gray-900">{venta.items.vendedor_telf}</p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 pt-3 border-t border-gray-300">
                  <p className="font-semibold text-gray-700">Total:</p>
                  <p className="font-bold text-gray-900">${venta.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}