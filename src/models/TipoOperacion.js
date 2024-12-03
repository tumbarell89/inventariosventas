import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TipoOperacion = sequelize.define('TipoOperacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  denominacion: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default TipoOperacion;

