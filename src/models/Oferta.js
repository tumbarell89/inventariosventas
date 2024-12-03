import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Oferta = sequelize.define('Oferta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.JSON,
    allowNull: false
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sincronizado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Oferta.belongsTo(User, { foreignKey: 'negocio_id' });

export default Oferta;

