import React from 'react';
import SearchBar from './SearchBar';
import InventoryTable from './InventoryTable';
import OperationsCard from './OperationsCard';

const Almacen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Gestión de Almacén</h1>
      <SearchBar onSearch={(query) => console.log(query)}/>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <InventoryTable title="Almacén General" type="general" />
        <InventoryTable title="Almacén de Venta" type="venta" />
      </div>
      <OperationsCard />
    </div>
  );
};

export default Almacen;

