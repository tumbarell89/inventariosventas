import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Jornada = sequelize.define('Jornada', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  inicio: {
    type: DataTypes.JSON,
    allowNull: false
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  totalJornada: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

Jornada.belongsTo(User, { foreignKey: 'negocio_id' });

export default Jornada;

