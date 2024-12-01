import prisma from './prisma';

export async function fetchJornadas() {
  return await prisma.jornada.findMany({
    orderBy: {
      fechaInicio: 'desc',
    },
  });
}

export async function iniciarJornada() {
  return await prisma.jornada.create({
    data: {
      inicio: {},
      fechaInicio: new Date(),
      totalJornada: {},
      negocio_id: 'ID_DEL_NEGOCIO', // Reemplazar con el ID real del negocio
    },
  });
}

export async function cerrarJornada(id) {
  return await prisma.jornada.update({
    where: { id },
    data: {
      fechaFin: new Date(),
    },
  });
}

