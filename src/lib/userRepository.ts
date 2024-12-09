import User from '../models/User';
import TipoUsuario from '../models/TipoUsuario';
import { Op, Sequelize } from 'sequelize';
import type{ UserData } from './types';
import UserAuth from '../components/UserAuth';

export const createUser = async (userData: any) => {
  return await User.create(userData);
};

export const createUserNegocio = async (userData: any) => {
  return await User.create(userData);
};

export const findUserByTelefono = async (telefono: string) => {
  return await User.findOne({ where: { telefono } });
};

export const updateUser = async (id: string, userData: Partial<UserData>) => {
  const [updatedRowsCount, updatedUsers] = await User.update(userData, { where: { id }, returning: true });
  return updatedUsers[0];
};

export const deleteUser = async (id: string) => {
  return await User.destroy({ where: { id } });
};

export const searchUsers = async (query: string, userId: string) => {
  return await User.findAll({
    where: {
      admin_id: userId,
      [Op.or]: [
        { telefono: { [Op.like]: `%${query}%` } },
        { nombre_negocio: { [Op.like]: `%${query}%` } },
        { correo: { [Op.like]: `%${query}%` } }
      ]
    },
include :[
  {model: TipoUsuario,
  as: 'tipoUsuario',
  attributes: ['nombre']
}
]
  });
};

export const getUserById = async (id: string) => {
  return await User.findByPk(id);
};

export const getAllUserTypes = async () => {
  return await TipoUsuario.findAll();
};

