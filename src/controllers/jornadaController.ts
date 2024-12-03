import { fetchJornadas, iniciarJornada, cerrarJornada } from '../lib/jornadaQueries';

export async function getJornadas() {
  return await fetchJornadas();
}

export async function iniciarNuevaJornada(negocio_id) {
  return await iniciarJornada(negocio_id);
}

export async function finalizarJornada(id) {
  return await cerrarJornada(id);
}

