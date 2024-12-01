import prisma from './prisma';
import bcrypt from 'bcryptjs';

export async function fetchUsers() {
  return await prisma.user.findMany({
    where: {
      es_admin: false,
    },
  });
}

export async function createUser(userData: any) {
  const hashedPassword = await bcrypt.hash(userData.contrasena, 10);
  return await prisma.user.create({
    data: {
      ...userData,
      contrasena: hashedPassword,
    },
  });
}

export async function updateUser(id: string, userData:any) {
  if (userData.contrasena) {
    userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
  }
  return await prisma.user.update({
    where: { id },
    data: userData,
  });
}

export async function deleteUser(id:string) {
  return await prisma.user.delete({
    where: { id },
  });
}

