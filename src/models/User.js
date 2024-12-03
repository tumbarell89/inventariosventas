import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  telefono: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  nombre_negocio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  es_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  },
  habilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'User',
  timestamps: false
});

export default User;

