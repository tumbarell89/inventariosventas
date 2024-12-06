import { createUser as createUserRepo, updateUser as updateUserRepo, deleteUser as deleteUserRepo, searchUsers as searchUsersRepo } from '../lib/userRepository';
import { UserData } from '../lib/types';
import bcrypt from 'bcrypt';

export const createUser = async (userData: UserData) => {
  userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
  const newUser = await createUserRepo(userData);
  return { message: 'Usuario creado exitosamente', userId: newUser.id };
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

export const searchUsers = async (query: string) => {
  const users = await searchUsersRepo(query);
  return { users };
};

