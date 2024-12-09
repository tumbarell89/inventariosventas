import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: string;
  public telefono!: string;
  public correo!: string;
  public nombre_negocio!: string;
  public admin_id!: string;
  public es_admin!: boolean;
  public contrasena!: string;
  public habilitado!: boolean;
  public id_tipo_usuario!: number;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombre_negocio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  es_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  habilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  id_tipo_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;

