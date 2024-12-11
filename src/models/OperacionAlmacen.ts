import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Almacen from './Almacen';

class OperacionAlmacen extends Model {
  public id!: number;
  public tipo!: 'entrada' | 'salida';
  public fecha!: Date;
  public usuarioId!: string;
  public almacenId!: number;
  public cantidad!: number;
  public precioOperacion!: string; // JSON string
}

OperacionAlmacen.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'salida'),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  usuarioId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  almacenId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Almacen,
      key: 'id',
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precioOperacion: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('precioOperacion'));
    },
    set(value: any) {
      this.setDataValue('precioOperacion', JSON.stringify(value));
    },
  },
}, {
  sequelize,
  modelName: 'OperacionAlmacen',
});

OperacionAlmacen.belongsTo(User, { foreignKey: 'usuarioId' });
OperacionAlmacen.belongsTo(Almacen, { foreignKey: 'almacenId' });

export default OperacionAlmacen;

