import { fetchProductos, fetchOperacionesEntrada } from '../lib/almacenQueries';

export async function getProductos() {
  return await fetchProductos();
}

export async function getOperacionesEntrada() {
  return await fetchOperacionesEntrada();
}

