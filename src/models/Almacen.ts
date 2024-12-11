import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Producto from './Producto';

class Almacen extends Model {
  public id!: number;
  public precioCosto!: string; // JSON string
  public cantidad!: number;
  public usuarioId!: string;
  public productoId!: number;
}

Almacen.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  precioCosto: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('precioCosto'));
    },
    set(value: any) {
      this.setDataValue('precioCosto', JSON.stringify(value));
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  usuarioId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Almacen',
});

Almacen.belongsTo(User, { foreignKey: 'usuarioId' });
Almacen.belongsTo(Producto, { foreignKey: 'productoId' });

export default Almacen;

