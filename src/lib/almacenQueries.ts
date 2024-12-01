import prisma from './prisma';

export async function fetchProductos() {
  return await prisma.producto.findMany();
}

export async function fetchOperacionesEntrada() {
  return await prisma.operacionEntrada.findMany({
    include: {
      producto: true,
    },
  });
}

