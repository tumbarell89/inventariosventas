import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class TipoUsuario extends Model {
  public id!: number;
  public nombre!: string;
}

TipoUsuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'TipoUsuarios',
});

export default TipoUsuario;

