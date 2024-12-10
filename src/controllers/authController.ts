import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByTelefono } from '../lib/userRepository';
import type { UserData, LoginData } from '../lib/types';

export const register = async (userData: UserData) => {
  const existingUser = await findUserByTelefono(userData.telefono);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
  userData.es_admin=true;
  const newUser = await createUser(userData);

  return { message: 'Usuario registrado exitosamente', userId: newUser.id };
};

export const login = async (loginData: LoginData) => {
  const user = await findUserByTelefono(loginData.telefono);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  console.log(user);
  console.log(loginData);

  const isPasswordValid = await bcrypt.compare(loginData.contrasena, user.dataValues.contrasena);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ userId: user.dataValues.id }, process.env.JWT_SECRET!);

  return { message: 'Inicio de sesión exitoso', token, user: { id: user.dataValues.id, nombre_negocio: user.dataValues.nombre_negocio, telefono: user.dataValues.telefono, es_admin: user.dataValues.es_admin } };
};

