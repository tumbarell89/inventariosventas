import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Moneda  from './Moneda';
import type { TazaCambioData } from '../lib/types';

class TazaCambio extends Model<TazaCambioData> implements TazaCambioData {
  public id!: number;
  public moneda_origen_id!: number;
  public moneda_destino_id!: number;
  public valor!: number;
  public fecha!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TazaCambio.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  moneda_origen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Moneda,
      key: 'id',
    },
  },
  moneda_destino_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Moneda,
      key: 'id',
    },
  },
  valor: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'TazaCambio',
  tableName: 'TazasCambio',
});

TazaCambio.belongsTo(Moneda, { as: 'monedaOrigen', foreignKey: 'moneda_origen_id' });
TazaCambio.belongsTo(Moneda, { as: 'monedaDestino', foreignKey: 'moneda_destino_id' });

export default TazaCambio;

