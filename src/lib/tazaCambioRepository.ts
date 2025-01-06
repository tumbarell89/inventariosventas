import { Op, Transaction } from 'sequelize';
import sequelize from '../config/database';
import type { HistoricoTazaCambioData, TazaCambioData } from './types';
import TazaCambio from '../models/TazaCambio';
import Moneda from '../models/Moneda';
import HistoricoTazaCambio from '@/models/HistoricoTazaCambio';

export const tazaCambioRepository = {
  async getLatest(): Promise<Record<string, Record<string, number>>> {
    const limit =1;
    const historicos = await HistoricoTazaCambio.findAll({
      order: [['fecha', 'DESC']],
      limit
    });
    if (historicos.length > 0) {
      const latestHistorico = historicos[0];
      return latestHistorico.dataValues.datos;
    }
  
    return {};
  },

  async bulkUpsert(tazasCambio: Omit<TazaCambioData, 'id'>[]): Promise<void> {
    await sequelize.transaction(async (t: Transaction) => {
      for (const tazaCambio of tazasCambio) {
        await TazaCambio.upsert(tazaCambio, { transaction: t });
      }
    });
  },

  async createInitialRates(newMonedaId: number): Promise<void> {
    const monedas = await Moneda.findAll();
    const newRates: Omit<TazaCambioData, 'id'>[] = [];

    for (const moneda of monedas) {
      if (moneda.id !== newMonedaId) {
        newRates.push(
          { moneda_origen_id: newMonedaId, moneda_destino_id: moneda.id, valor: 1, fecha: new Date() },
          { moneda_origen_id: moneda.id, moneda_destino_id: newMonedaId, valor: 1, fecha: new Date() }
        );
      }
    }

    await this.bulkUpsert(newRates);
  },

  async deleteRatesForMoneda(monedaId: number): Promise<void> {
    await TazaCambio.destroy({
      where: {
        [Op.or]: [
          { moneda_origen_id: monedaId },
          { moneda_destino_id: monedaId }
        ]
      }
    });
  }
};

