import React, { useState, useEffect } from 'react';
import type { ProductoAlmacen } from '../lib/types';

interface InventoryTableProps {
  title: string;
  type: 'general' | 'venta';
}

const InventoryTable: React.FC<InventoryTableProps> = ({ title, type }) => {
  const [products, setProducts] = useState<ProductoAlmacen[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setLoading(true);
    // Aquí iría la lógica para obtener los productos del backend
    // Por ahora, usaremos datos de ejemplo
    const mockProducts: ProductoAlmacen[] = [
      {
        id: 1,
        denominacion: 'Producto 1',
        procedencia: 'Local',
        codigo: 'P001',
        almacen: {
          id: 1,
          precioCosto: [
            { moneda: 'CUP', precio: 100 },
            { moneda: 'MLC', precio: 2 },
            { moneda: 'USD', precio: 2 },
            { moneda: 'EUR', precio: 1.8 },
          ],
          cantidad: 50,
          usuarioId: '1',
          productoId: 1,
        },
      },
      // Añade más productos de ejemplo aquí
    ];
    setProducts((prevProducts) => [...prevProducts, ...mockProducts]);
    setLoading(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="max-h-96 overflow-y-auto" onScroll={handleScroll}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CUP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MLC</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USD</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EUR</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{product.denominacion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.almacen.cantidad}</td>
                      {product.almacen.precioCosto.map((precio) => (
                        <td key={precio.moneda} className="px-6 py-4 whitespace-nowrap">
                          {precio.precio.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {loading && <p className="text-center mt-4">Cargando más productos...</p>}
    </div>
  );
};

export default InventoryTable;

