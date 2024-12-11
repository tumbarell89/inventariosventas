import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Producto extends Model {
  public id!: number;
  public denominacion!: string;
  public procedencia!: string;
  public codigo!: string;
}

Producto.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  denominacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  procedencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Producto',
});

export default Producto;

