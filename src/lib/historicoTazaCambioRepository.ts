import HistoricoTazaCambio  from '../models/HistoricoTazaCambio';
import type { HistoricoTazaCambioData } from './types';

export const historicoTazaCambioRepository = {
  async create(historicoTazaCambio: Omit<HistoricoTazaCambioData, 'id'>): Promise<HistoricoTazaCambioData> {
    return await HistoricoTazaCambio.create(historicoTazaCambio);
  },

  async getRecent(limit: number = 10): Promise<HistoricoTazaCambioData[]> {
    const historicos = await HistoricoTazaCambio.findAll({
      order: [['fecha', 'DESC']],
      limit
    });

    return historicos.map(historico => ({
      ...historico.get({ plain: true })
    }));
  }
};

