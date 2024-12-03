import User from '../models/User';
import bcrypt from 'bcryptjs';

export async function fetchUsers() {
  return await User.findAll({
    where: {
      es_admin: false
    }
  });
}
export async function findOneUser(telefono: string) {
  return await User.findOne({ where: { telefono } });
}

export async function createUser(userData:any) {
  const hashedPassword = await bcrypt.hash(userData.contrasena, 10);
  return await User.create({
    ...userData,
    contrasena: hashedPassword
  });
}

export async function updateUser(id:string, userData:any) {
  const user = await User.findByPk(id);
  if (user) {
    if (userData.contrasena) {
      userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
    }
    return await user.update(userData);
  }
  throw new Error('Usuario no encontrado');
}

export async function deleteUser(id:string) {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return { success: true };
  }
  throw new Error('Usuario no encontrado');
}

