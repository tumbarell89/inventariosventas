import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Producto from './Producto.js';

const OperacionEntrada = sequelize.define('OperacionEntrada', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

OperacionEntrada.belongsTo(Producto);

export default OperacionEntrada;

