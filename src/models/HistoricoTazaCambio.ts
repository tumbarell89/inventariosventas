import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class HistoricoTazaCambio extends Model {
  public id!: number;
  public fecha!: Date;
  public datos!: string; // JSON string
}

HistoricoTazaCambio.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  datos: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('datos'));
    },
    set(value: any) {
      this.setDataValue('datos', JSON.stringify(value));
    },
  },
}, {
  sequelize,
  modelName: 'HistoricoTazaCambio',
  tableName: 'HistoricoTazasCambio',
});

export default HistoricoTazaCambio;

