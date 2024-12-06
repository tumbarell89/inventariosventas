import TipoUsuario from '../models/TipoUsuario';

export const getAllTipoUsuarios = async () => {
  return await TipoUsuario.findAll();
};

export const getTipoUsuarioById = async (id: number) => {
  return await TipoUsuario.findByPk(id);
};

