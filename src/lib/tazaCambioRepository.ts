import  TazaCambio  from '../models/TazaCambio';
import  Moneda  from '../models/Moneda';
import { Op } from 'sequelize';
import type { TazaCambioData } from './types';

export const tazaCambioRepository = {
  async getLatest(): Promise<TazaCambioData[]> {
    const latestDate = await TazaCambio.max('fecha') as Date;
    const tazas = await TazaCambio.findAll({
      where: { fecha: latestDate },
      include: [
        { model: Moneda, as: 'monedaOrigen', attributes: ['denominacion'] },
        { model: Moneda, as: 'monedaDestino', attributes: ['denominacion'] }
      ]
    });

    return tazas.map(taza => taza.get({ plain: true }));
  },

  async upsert(tazaCambio: Omit<TazaCambioData, 'id'>): Promise<TazaCambioData> {
    const [instance, created] = await TazaCambio.upsert(tazaCambio, {
      returning: true
    });
    return instance.get({ plain: true });
  }
};

