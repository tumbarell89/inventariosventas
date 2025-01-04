import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import type { HistoricoTazaCambioData } from '../lib/types';

class HistoricoTazaCambio extends Model<HistoricoTazaCambioData> implements HistoricoTazaCambioData {
  public id!: number;
  public fecha!: Date;
  public datos!: Record<string, Record<string, number>>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    type: DataTypes.JSONB,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('datos');
      return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
    },
    set(value: Record<string, Record<string, number>>) {
      this.setDataValue('datos', value);
    }
  }
}, {
  sequelize,
  modelName: 'HistoricoTazaCambio',
  tableName: 'HistoricoTazasCambio',
});

export default HistoricoTazaCambio;

