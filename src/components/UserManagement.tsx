import React, { useState, useEffect } from 'react'
import type { Admin, User } from '../lib/supabasenegocio'
import { CreateUserNegocio, DeleteUserNegocio, UpdatePassAdmin, UpdateUserNegocio, UserNegocio } from '../lib/supabasemetodos'
import { getCurrentUser } from '../lib/supabaseseguridad'

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [telefono, setTelefono] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [tipo, setTipo] = useState('vendedor')
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [changePassword, setChangePassword] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  // const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.es_admin) {
      setAdmin(currentUser);
      fetchUsers(currentUser.id);
    }
  }, [])

  async function fetchUsers(adminId: string) {
    const { data, error } = await UserNegocio(adminId);

    if (error) {
      console.error('Error fetching users:', error)
    } else {
      setUsers(data || [])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true);
    try {
      if (editingUserId) {
        await updateUser()
      } else {
        await createUser()
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function createUser() {
    if (!admin) return

    const { data, error } = await CreateUserNegocio(
      telefono, 
      contrasena, 
      admin.nombre_negocio,
      admin.id,
      tipo
    );
    if(data){
      console.debug('ok');
    }
    if (error) {
      alert('Error creating user: '+error);
      console.error('Error creating user:', error)
    } else {
      const currentUser = getCurrentUser();
      clearForm()
      fetchUsers(currentUser!.id);
    }
  }

  async function updateUser() {
    const { data, error } = await UpdateUserNegocio(telefono, contrasena, editingUserId!, tipo);
    if(data){
      console.debug('ok');
    }
    if (error) {
      alert('Error updating user: '+error);
      console.error('Error updating user:', error)
    } else {
      const currentUser = getCurrentUser();
      clearForm()
      fetchUsers(currentUser!.id);
    }
  }

  async function deleteUser(id: string) {
    setIsLoading(true);
    const { error } = await DeleteUserNegocio(id);

    try {
      if (error) {
        console.error('Error deleting user:', error)
        alert('Usuario en uso, no se puede eliminar de esta forma, contacte al equipo de soporte');
      } else {
        const currentUser = getCurrentUser();
        fetchUsers(currentUser!.id);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function clearForm() {
    setTelefono('')
    setContrasena('')
    setTipo('vendedor')
    setEditingUserId(null)
  }

  function startEditing(user: User) {
    setTelefono(user.telefono)
    setTipo(user.tipo || 'vendedor')
    setEditingUserId(user.id)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    
    //e.preventDefault();
    ///setMessage({ type: '', content: '' });
    console.debug(e);
    try {
    if (changePassword.newPassword !== changePassword.confirmNewPassword) {
      alert('pass diferentes');
      //setMessage({ type: 'error', content: 'Las nuevas contraseñas no coinciden.' });
      
    }else{
    setIsLoading(true);
    
      const { data, error } = await UpdatePassAdmin(
        changePassword.newPassword, admin!.id
      );

      if (error) throw error;

      if(data) alert('todo ok jose luis');
      //setMessage({ type: 'success', content: 'Contraseña actualizada con éxito.' });
      //setChangePassword({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      alert('ui un error');
      //setMessage({ type: 'error', content: 'Error al cambiar la contraseña. Por favor, intente de nuevo.' });
    }finally{
      setIsLoading(true);
    }

  };

  if (!admin) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios para {admin.nombre_negocio}</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
            Tipo de Usuario
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="vendedor">Vendedor</option>
            <option value="despachador">Despachador</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editingUserId ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.telefono}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.tipo || 'vendedor'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => startEditing(user)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Nuevo formulario para cambiar contraseña */}
      <form onSubmit={handleChangePassword} className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
        <div className="space-y-4">
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
            Nueva Contraseña
          </label>
          <input
            id="newPassword"
            type="password"
            value={changePassword.newPassword}
            onChange={(e) => setChangePassword({...changePassword, newPassword: e.target.value})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
             Confirmar Nueva Contraseña
          </label>
          <input
           id="confirmNewPassword"
           type="password"
           value={changePassword.confirmNewPassword}
           onChange={(e) => setChangePassword({...changePassword, confirmNewPassword: e.target.value})}
           required
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
          <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cabmbiar contraseña
        </button>
        </div>
      </form>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-center font-semibold">Cargando...</p>
          </div>
        </div>
      )}
    </div>
  )
}