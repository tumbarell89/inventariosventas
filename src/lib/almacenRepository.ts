import Producto from '../models/Producto';
import Almacen from '../models/Almacen';
import OperacionAlmacen from '../models/OperacionAlmacen';
import { Op } from 'sequelize';

export const createProducto = async (productoData: any) => {
  return await Producto.create(productoData);
};

export const getProductos = async (query: string = '') => {
  return await Producto.findAll({
    where: {
      [Op.or]: [
        { denominacion: { [Op.like]: `%${query}%` } },
        { codigo: { [Op.like]: `%${query}%` } },
      ],
    },
  });
};

export const getAlmacenByUsuario = async (usuarioId: string) => {
  return await Almacen.findAll({
    where: { usuarioId },
    include: [{ model: Producto }],
  });
};

export const createOperacionAlmacen = async (operacionData: any) => {
  const operacion = await OperacionAlmacen.create(operacionData);
  const almacen = await Almacen.findByPk(operacionData.almacenId);
  
  if (almacen) {
    if (operacionData.tipo === 'entrada') {
      almacen.cantidad += operacionData.cantidad;
    } else {
      almacen.cantidad -= operacionData.cantidad;
    }
    await almacen.save();
  }

  return operacion;
};

export const getOperacionesAlmacen = async (usuarioId: string) => {
  return await OperacionAlmacen.findAll({
    where: { usuarioId },
    include: [{ model: Almacen, include: [{ model: Producto }] }],
    order: [['fecha', 'DESC']],
  });
};

