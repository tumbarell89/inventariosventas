import { fetchTazasCambio, createTazaCambio, updateTazaCambio, deleteTazaCambio } from '../lib/tazaCambioQueries';

export async function getTazasCambio() {
  return await fetchTazasCambio();
}

export async function crearTazaCambio(data) {
  return await createTazaCambio(data);
}

export async function actualizarTazaCambio(id, data) {
  return await updateTazaCambio(id, data);
}

export async function eliminarTazaCambio(id) {
  return await deleteTazaCambio(id);
}

