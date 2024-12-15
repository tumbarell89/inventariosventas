import React, { useState } from 'react';
import type { ProductoAlmacen, OperacionAlmacenData } from '../lib/types';

const OperationsCard: React.FC = () => {
  const [newProduct, setNewProduct] = useState({ denominacion: '', codigo: '', proveedor: '' });
  const [operationType, setOperationType] = useState<'entrada' | 'salida' | 'venta'>('entrada');
  const [selectedProducts, setSelectedProducts] = useState<ProductoAlmacen[]>([]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para añadir un nuevo producto
    console.log('Nuevo producto:', newProduct);
    setNewProduct({ denominacion: '', codigo: '', proveedor: '' });
  };

  const handleOperationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperationType(e.target.value as 'entrada' | 'salida' | 'venta');
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, almacen: { ...product.almacen, cantidad: quantity } } : product
      )
    );
  };

  const handlePriceChange = (productId: number, moneda: string, precio: number) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
              ...product,
              almacen: {
                ...product.almacen,
                precioCosto: product.almacen.precioCosto.map(p =>
                  p.moneda === moneda ? { ...p, precio } : p
                ),
              },
            }
          : product
      )
    );
  };

  const calculateTotals = () => {
    return selectedProducts.reduce(
      (totals: { [key: string]: number }, product) => {
        product.almacen.precioCosto.forEach(({ moneda, precio }) => {
          totals[moneda] += precio * product.almacen.cantidad;
        });
        return totals;
      },
      { CUP: 0, MLC: 0, USD: 0, EUR: 0 }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Operaciones</h2>
      <form onSubmit={handleAddProduct} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Denominación"
            value={newProduct.denominacion}
            onChange={(e) => setNewProduct({ ...newProduct, denominacion: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Código"
            value={newProduct.codigo}
            onChange={(e) => setNewProduct({ ...newProduct, codigo: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Proveedor"
            value={newProduct.proveedor}
            onChange={(e) => setNewProduct({ ...newProduct, proveedor: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Añadir Producto
        </button>
      </form>
      <div className="mb-4">
        <select
          value={operationType}
          onChange={handleOperationTypeChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="entrada">Entrada de Almacén</option>
          <option value="salida">Salida a Ventas</option>
          <option value="venta">Venta Directa</option>
        </select>
      </div>
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
          {selectedProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.denominacion}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={product.almacen.cantidad}
                  onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                  className="p-1 border border-gray-300 rounded-md w-20"
                />
              </td>
              {product.almacen.precioCosto.map(({ moneda, precio }) => (
                <td key={moneda} className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={precio}
                    onChange={(e) => handlePriceChange(product.id, moneda, Number(e.target.value))}
                    className="p-1 border border-gray-300 rounded-md w-20"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap font-medium">Totales</td>
            <td className="px-6 py-4 whitespace-nowrap"></td>
            {Object.entries(calculateTotals()).map(([moneda, total]) => (
              <td key={moneda} className="px-6 py-4 whitespace-nowrap font-medium">
                {total.toFixed(2)}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OperationsCard;

