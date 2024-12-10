import { createUser as createUserRepo, createUserNegocio as createUserNegocioRepo, updateUser as updateUserRepo, deleteUser as deleteUserRepo, searchUsers as searchUsersRepo, getUserById, getAllUserTypes as getAllUserTypesRepo } from '../lib/userRepository';
import type { UserData } from '../lib/types';
import bcrypt from 'bcryptjs';
import { INTEGER } from 'sequelize';

export const createUser = async (userData: UserData) => {
  userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
  const newUser = await createUserRepo(userData);
  return { message: 'Usuario creado exitosamente', userId: newUser.id };
};
export const createUserNegocio = async (userData: UserData) => {
  userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
  userData.id_tipo_usuario = Number(userData.tipo);
  const newUser = await createUserNegocioRepo(userData);
  return { message: 'Usuario creado exitosamente', user: newUser };
};

export const updateUser = async (id: string, updateData: Partial<UserData>) => {
  if (updateData.contrasena) {
    updateData.contrasena = await bcrypt.hash(updateData.contrasena, 10);
  }
  const updatedUser = await updateUserRepo(id, updateData);
  return { message: 'Usuario actualizado exitosamente', userId: updatedUser.id };
};

export const deleteUser = async (id: string) => {
  await deleteUserRepo(id);
  return { message: 'Usuario eliminado exitosamente' };
};

export const searchUsers = async (query: string, userId: string) => {
  const users = await searchUsersRepo(query, userId);
  return users;
};

export const getUserBusinessName = async (userId: string) => {
  const user = await getUserById(userId);
  return user?.nombre_negocio || '';
};

export const getAllUserTypes = async () => {
  return await getAllUserTypesRepo();
};

