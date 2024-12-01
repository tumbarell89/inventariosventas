import { useState, useEffect } from 'react';
import { resumenVenta } from '../lib/repositorios';
import type { ResumenDiario } from '../lib/supabasenegocio';


export default function ResumenVentasDiarias() {
  const [resumen, setResumen] = useState<ResumenDiario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchResumenVentas();
  }, []);

  async function fetchResumenVentas() {
    setIsLoading(true);
    setError(null);
    try {
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user) {
        setUser(user);
      }
      let negocio_id = user.id;
      const { data, error } = await resumenVenta(negocio_id);

      if (error) throw error;

      setResumen(data || []);
    } catch (err) {
      console.error('Error fetching resumen de ventas:', err);
      setError('Error al cargar el resumen de ventas. Por favor, intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <div className="bg-white rounded-lg shadow p-4">Cargando resumen de ventas...</div>;
  if (error) return <div className="bg-white rounded-lg shadow p-4 text-red-500">Error: {error}</div>;
  if (resumen.length === 0) return <div className="bg-white rounded-lg shadow p-4">No hay ventas para mostrar.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-2xl font-bold mb-4 h1responsivetext">Resumen de Ventas Diarias</h2>
      <div className="space-y-8">
        {resumen.map((dia) => (
          <div key={dia.fecha} className="border-b pb-8">
            <h3 className="text-xl font-semibold mb-4">{dia.fecha}</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Producto</th>
                    <th className="p-2 text-right">Cantidad</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dia.productos.map((producto, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{producto.producto}</td>
                      <td className="p-2 text-right">{producto.cantidad}</td>
                      <td className="p-2 text-right">${producto.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 shadow">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Resumen del día</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <p className="font-bold text-gray-600">Total ventas:</p>
                  <p className="font-bold text-gray-800">${dia.total_ventas.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="font-semibold text-gray-600">Cantidad de ventas:</p>
                  <p className="font-bold text-gray-800">{dia.cantidad_ventas}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="font-semibold text-gray-600">Total con transferencia:</p>
                  <p className="font-bold text-yellow-500">${dia.total_vendido_transferencia.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="font-semibold text-gray-600">Total sin transferencia:</p>
                  <p className="font-bold text-red-500">${dia.total_vendido_sin_transferencia.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 pt-3 border-t border-gray-300">
                  <p className="font-semibold text-gray-700">Total del día:</p>
                  <p className="font-bold text-gray-900">${dia.total_ventas.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-100 rounded-lg p-6 shadow">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Resumen General</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <p className="font-semibold text-gray-600">Cantidad Total de Ventas:</p>
            <p className="font-bold text-gray-800">{resumen[0].cant_total_de_ventas}</p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="font-semibold text-gray-600">Monto total con transferencia:</p>
            <p className="font-bold text-yellow-500">${resumen[0].monto_total_transferencia.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="font-semibold text-gray-600">Monto total sin transferencia:</p>
            <p className="font-bold text-red-500">${resumen[0].monto_total_sin_transferencia.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 pt-3 border-t border-gray-300">
            <p className="font-semibold text-gray-700">Total General:</p>
            <p className="font-bold text-gray-900">${resumen[0].monto_total_todas_ventas.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}