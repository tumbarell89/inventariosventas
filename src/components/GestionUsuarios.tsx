import React, { useState, useEffect } from 'react';
import type { UserData } from '../lib/types';

interface UserType {
  id: number;
  nombre: string;
}

export default function GestionUsuarios() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [newUser, setNewUser] = useState<Partial<UserData>>({ 
    telefono: '', 
    tipo: '', 
    contrasena: '' 
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchBusinessNameAndUserTypes();
  }, []);

  const fetchBusinessNameAndUserTypes = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/users/business-info', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch business info');
      }

      const data = await response.json();
      setBusinessName(user.nombre_negocio);
      setUserTypes(data.userTypes);
    } catch (error) {
      console.error('Error fetching business info:', error);
      setError('Error fetching business info. Please try again.');
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/users/users?q=${searchQuery}`, {
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

      const userData = {
        ...newUser,
        nombre_negocio: businessName,
        admin_id: JSON.parse(localStorage.getItem('user') || '{}').id,
        id: editingUserId ? editingUserId : null,
      };

      const url = '/api/users/users';

      const method = editingUserId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingUserId ? 'update' : 'create'} user`);
      }

      const createdOrUpdatedUser = await response.json();
      fetchUsers();
      // if (editingUserId) {
      //   setUsers(users.map(user => user.id === editingUserId ? createdOrUpdatedUser : user));
      // } else {
      //   setUsers([...users, createdOrUpdatedUser]);
      // }
      setNewUser({ telefono: '', tipo: '', contrasena: '' });
      setEditingUserId(null);
    } catch (error) {
      console.error(`Error ${editingUserId ? 'updating' : 'creating'} user:`, error);
      setError(`Error ${editingUserId ? 'updating' : 'creating'} user. Please try again.`);
    }
  };

  const handleEdit = (user: UserData) => {
    setNewUser({
      telefono: user.telefono,
      tipo: user.tipo,
      contrasena: ''  // We don't set the password for security reasons
    });
    setEditingUserId(user.id!);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/users/users', {
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

  const isFormValid = () => {
    return newUser.telefono!.length === 8 && newUser.tipo !== '' && newUser.contrasena !== '';
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                value={newUser.telefono}
                onChange={(e) =>
                  setNewUser({ ...newUser, telefono: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxLength={8}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre_negocio"
              >
                Nombre del Negocio
              </label>
              <input
                type="text"
                id="nombre_negocio"
                value={businessName}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tipo"
              >
                Tipo de Usuario
              </label>
              <select
                id="tipo"
                value={newUser.tipo}
                onChange={(e) =>
                  setNewUser({ ...newUser, tipo: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Seleccionar Tipo</option>
                {userTypes.map((type) => (
                  <option key={type.id} value={type.id.toString()}>
                    {type.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contrasena"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                value={newUser.contrasena}
                onChange={(e) =>
                  setNewUser({ ...newUser, contrasena: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  !isFormValid()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={!isFormValid()}
              >
                {editingUserId ? "Actualizar Usuario" : "Agregar Usuario"}
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar usuarios"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={fetchUsers}
              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Buscar
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Teléfono</th>
                  <th className="py-2 px-4 border-b">Nombre del Negocio</th>
                  <th className="py-2 px-4 border-b">Tipo</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4 border-b">{user.telefono}</td>
                      <td className="py-2 px-4 border-b">
                        {user.nombre_negocio}
                      </td>
                      <td className="py-2 px-4 border-b">{user.tipoUsuario!.nombre}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleEdit(user)}
                          className="mr-2 p-1 bg-yellow-500 text-white rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id!)}
                          className="p-1 bg-red-500 text-white rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-2 px-4 text-center">
                      No hay usuarios disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

