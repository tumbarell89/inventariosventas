import prisma from './prisma';

export async function fetchTazasCambio() {
  return await prisma.tazaCambio.findMany();
}

export async function createTazaCambio(data) {
  return await prisma.tazaCambio.create({
    data: {
      tazamoneda: data,
      fechaActualizacion: new Date(),
    },
  });
}

export async function updateTazaCambio(id, data) {
  return await prisma.tazaCambio.update({
    where: { id },
    data: {
      tazamoneda: data,
      fechaActualizacion: new Date(),
    },
  });
}

export async function deleteTazaCambio(id) {
  return await prisma.tazaCambio.delete({
    where: { id },
  });
}

