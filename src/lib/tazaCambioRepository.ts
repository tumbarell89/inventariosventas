import { Op } from 'sequelize';
import type { TazaCambioData } from './types';
import TazaCambio from '../models/TazaCambio';
import Moneda from '../models/Moneda';

export const tazaCambioRepository = {
  async getLatest(): Promise<TazaCambioData[]> {
    const latestDate = await TazaCambio.max('fecha');
    return await TazaCambio.findAll({
      where: { fecha: latestDate },
      include: [
        { model: Moneda, as: 'monedaOrigen', attributes: ['denominacion'] },
        { model: Moneda, as: 'monedaDestino', attributes: ['denominacion'] }
      ]
    });
  },

  async upsert(tazaCambio: Omit<TazaCambioData, 'id'>): Promise<TazaCambioData> {
    const [instance, created] = await TazaCambio.upsert(tazaCambio, {
      returning: true
    });
    return instance;
  }
};

