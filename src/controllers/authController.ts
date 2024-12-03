import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../lib/db';

export async function login(telefono: string, contrasena: string) {

  const user = await User.findOne({ where: { telefono } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isPasswordValid = await bcrypt.compare(contrasena, user.dataValues.contrasena);

  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { userId: user.dataValues.id, telefono: user.dataValues.telefono },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return {
    user: {
      id: user.dataValues.id,
      telefono: user.dataValues.telefono,
      nombre_negocio: user.dataValues.nombre_negocio,
      es_admin: user.dataValues.es_admin,
      tipo: user.dataValues.tipo,
      correo: user.dataValues.correo,
      habilitado: user.dataValues.habilitado
    },
    token
  };
}

export async function register(userData: {
  telefono: string;
  nombre_negocio: string;
  tipo: string;
  correo: string;
  contrasena: string;
}) {
  console.log(userData.nombre_negocio);
  const existingUser = await User.findOne({ where: { telefono: userData.telefono } });

  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(userData.contrasena, 10);

  const newUser = await User.create({
    ...userData,
    contrasena: hashedPassword,
    es_admin: true,
    habilitado: true
  });

  return {
    user: {
      id: newUser.dataValues.id,
      telefono: newUser.dataValues.telefono,
      nombre_negocio: newUser.dataValues.nombre_negocio,
      es_admin: newUser.dataValues.es_admin,
      tipo: newUser.dataValues.tipo,
      correo: newUser.dataValues.correo,
      habilitado: newUser.dataValues.habilitado
    }
  };
}

