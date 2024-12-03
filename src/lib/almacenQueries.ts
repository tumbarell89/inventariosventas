import Producto from '../models/Producto';
import OperacionEntrada from '../models/OperacionEntrada';

export async function fetchProductos() {
  return await Producto.findAll();
}

export async function fetchOperacionesEntrada() {
  return await OperacionEntrada.findAll({
    include: [Producto]
  });
}

