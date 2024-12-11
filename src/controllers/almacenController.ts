import { createProducto, getProductos, getAlmacenByUsuario, createOperacionAlmacen, getOperacionesAlmacen } from '../lib/almacenRepository';

export const crearProducto = async (productoData: any) => {
  return await createProducto(productoData);
};

export const obtenerProductos = async (query: string = '') => {
  return await getProductos(query);
};

export const obtenerAlmacenUsuario = async (usuarioId: string) => {
  return await getAlmacenByUsuario(usuarioId);
};

export const crearOperacionAlmacen = async (operacionData: any) => {
  return await createOperacionAlmacen(operacionData);
};

export const obtenerOperacionesAlmacen = async (usuarioId: string) => {
  return await getOperacionesAlmacen(usuarioId);
};

