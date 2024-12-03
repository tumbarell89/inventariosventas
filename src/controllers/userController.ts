import { fetchUsers, createUser, updateUser, deleteUser } from '../lib/userQueries';

export async function getUsers() {
  return await fetchUsers();
}

export async function crearUsuario(userData) {
  return await createUser(userData);
}

export async function actualizarUsuario(id, userData) {
  return await updateUser(id, userData);
}

export async function eliminarUsuario(id) {
  return await deleteUser(id);
}

