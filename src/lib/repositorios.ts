import prisma from "./prisma";
import type {
  User,
  Admin,
  Oferta,
  ProductoVendido,
  ResumenDiario,
  VentaFinalizada,
  NuevaOferta,
} from "./types";
import bcrypt from "bcryptjs";

export async function fetchOfertas(negocio_id: string) {
  try {
    const ofertas = await prisma.oferta.findMany({
      where: { negocio_id },
      orderBy: { id: 'asc' },
    });
    return ofertas;
  } catch (error) {
    console.error("id:", negocio_id);
    console.error("Error fetching ofertas:", error);
    return [];
  }
}

export async function insertarVenta(
  newItems: {
    vendedor_telf: number;
    productos: { producto: string; cantidad: number; precio: number }[];
    comprobante: string;
  },
  total: number,
  user_id: string,
  vendedorTelefono: string
) {
  // Note: This function might need to be implemented as a custom query or adjusted based on your schema
  throw new Error("Function not implemented in Prisma. Please implement custom logic.");
}

export async function inserOferta(oferta: NuevaOferta) {
  return await prisma.oferta.create({
    data: { ...oferta, disponible: true },
  });
}

export async function updateOferta(oferta: Oferta, id: number) {
  return await prisma.oferta.update({
    where: { id },
    data: oferta,
  });
}

export async function deleteOferta(id: number) {
  return await prisma.oferta.delete({
    where: { id },
  });
}

export async function resumenVenta(negocio_id: string) {
  // Note: This function might need to be implemented as a custom query or adjusted based on your schema
  throw new Error("Function not implemented in Prisma. Please implement custom logic.");
}

export async function listarOrdenesconVendedor(negocio_id: string) {
  // Note: This function might need to be implemented as a custom query or adjusted based on your schema
  throw new Error("Function not implemented in Prisma. Please implement custom logic.");
}

export async function delVenta(id: number) {
  return await prisma.operacionFinalizada.delete({
    where: { id },
  });
}

export async function insertarAdminNegocio(
  telefono: string,
  contrasena: string,
  nombre_negocio: string
) {
  return await prisma.user.create({
    data: {
      telefono,
      contrasena,
      nombre_negocio,
      es_admin: true,
    },
  });
}

export async function UserNegocio(negocio: string) {
  return await prisma.user.findMany({
    where: {
      es_admin: false,
      admin_id: negocio,
    },
  });
}

export async function CreateUserNegocio(
  telefono: string,
  password: string,
  nombre_negocio: string,
  adminid: string,
  tipo: string
) {
  const contrasena = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      telefono,
      contrasena,
      nombre_negocio,
      es_admin: false,
      admin_id: adminid,
      tipo,
    },
  });
}

export async function UpdateUserNegocio(
  telefono: string,
  password: string,
  id: string,
  tipo: string
) {
  const contrasena = await bcrypt.hash(password, 10);
  return await prisma.user.update({
    where: { id },
    data: { telefono, contrasena, tipo },
  });
}

export async function DeleteUserNegocio(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}

export async function UpdatePassAdmin(
  password: string,
  id: string
) {
  const contrasena = await bcrypt.hash(password, 10);
  return await prisma.user.update({
    where: { id },
    data: { contrasena },
  });
}

