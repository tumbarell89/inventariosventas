import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TazaCambio = sequelize.define('TazaCambio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tazamoneda: {
    type: DataTypes.JSON,
    allowNull: false
  },
  fechaActualizacion: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

export default TazaCambio;

