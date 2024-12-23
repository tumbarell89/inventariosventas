import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Moneda extends Model {
  public id!: number;
  public denominacion!: string;
}

Moneda.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  denominacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Moneda',
  tableName: 'Monedas',
});

export default Moneda;

