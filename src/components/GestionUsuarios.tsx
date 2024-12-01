import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../lib/userQueries';

export default function GestionUsuarios() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ telefono: '', nombre_negocio: '', tipo: '', correo: '' });

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdUser = await createUser(newUser);
    setUsers([...users, createdUser]);
    setNewUser({ telefono: '', nombre_negocio: '', tipo: '', correo: '' });
  };

  const handleUpdate = async (id, updatedUser) => {
    const updated = await updateUser(id, updatedUser);
    setUsers(users.map(user => user.id === id ? updated : user));
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Teléfono"
          value={newUser.telefono}
          onChange={(e) => setNewUser({...newUser, telefono: e.target.value})}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Nombre del Negocio"
          value={newUser.nombre_negocio}
          onChange={(e) => setNewUser({...newUser, nombre_negocio: e.target.value})}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tipo"
          value={newUser.tipo}
          onChange={(e) => setNewUser({...newUser, tipo: e.target.value})}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Correo"
          value={newUser.correo}
          onChange={(e) => setNewUser({...newUser, correo: e.target.value})}
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Agregar Usuario</button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Nombre del Negocio</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Correo</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.telefono}</td>
              <td className="py-2 px-4 border-b">{user.nombre_negocio}</td>
              <td className="py-2 px-4 border-b">{user.tipo}</td>
              <td className="py-2 px-4 border-b">{user.correo}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleUpdate(user.id, { ...user })} className="mr-2 p-1 bg-yellow-500 text-white rounded">Editar</button>
                <button onClick={() => handleDelete(user.id)} className="p-1 bg-red-500 text-white rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

