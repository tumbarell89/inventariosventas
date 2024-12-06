import { useState, useEffect } from 'react';
import type { UserData } from '../lib/types';

export default function GestionUsuarios() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [newUser, setNewUser] = useState<Partial<UserData>>({ telefono: '', nombre_negocio: '', tipo: '', correo: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/users?q=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const createdUser = await response.json();
      setUsers([...users, createdUser]);
      setNewUser({ telefono: '', nombre_negocio: '', tipo: '', correo: '' });
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Error creating user. Please try again.');
    }
  };

  const handleUpdate = async (id: string, updatedUser: Partial<UserData>) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id, ...updatedUser }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updated = await response.json();
      setUsers(users.map(user => user.id === id ? { ...user, ...updated } : user));
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar usuarios"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <button onClick={fetchUsers} className="p-2 bg-green-500 text-white rounded">Buscar</button>
      </div>
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
                <button onClick={() => handleUpdate(user.id!, { ...user })} className="mr-2 p-1 bg-yellow-500 text-white rounded">Editar</button>
                <button onClick={() => handleDelete(user.id!)} className="p-1 bg-red-500 text-white rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

