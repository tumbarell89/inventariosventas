import TazaCambio from '../models/TazaCambio';

export async function fetchTazasCambio() {
  return await TazaCambio.findAll();
}

export async function createTazaCambio(data) {
  return await TazaCambio.create({
    tazamoneda: data,
    fechaActualizacion: new Date()
  });
}

export async function updateTazaCambio(id, data) {
  const tazaCambio = await TazaCambio.findByPk(id);
  if (tazaCambio) {
    return await tazaCambio.update({
      tazamoneda: data,
      fechaActualizacion: new Date()
    });
  }
  throw new Error('Taza de cambio no encontrada');
}

export async function deleteTazaCambio(id) {
  const tazaCambio = await TazaCambio.findByPk(id);
  if (tazaCambio) {
    await tazaCambio.destroy();
    return { success: true };
  }
  throw new Error('Taza de cambio no encontrada');
}

