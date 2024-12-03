import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import TipoOperacion from './TipoOperacion.js';
import Jornada from './Jornada.js';

const OperacionFinalizada = sequelize.define('OperacionFinalizada', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false
  },
  total: {
    type: DataTypes.JSON,
    allowNull: false
  },
  sincronizado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

OperacionFinalizada.belongsTo(TipoOperacion);
OperacionFinalizada.belongsTo(Jornada);

export default OperacionFinalizada;

