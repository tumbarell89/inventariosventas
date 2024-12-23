import HistoricoTazaCambio from "../models/HistoricoTazaCambio";
import type { HistoricoTazaCambioData } from "./types";


export const historicoTazaCambioRepository = {
  async create(historicoTazaCambio: Omit<HistoricoTazaCambioData, 'id'>): Promise<HistoricoTazaCambioData> {
    const created = await HistoricoTazaCambio.create(historicoTazaCambio);
    return created.toJSON() as HistoricoTazaCambioData;
  },

  async getRecent(limit: number = 10): Promise<HistoricoTazaCambioData[]> {
    const results = await HistoricoTazaCambio.findAll({
      order: [['fecha', 'DESC']],
      limit
    });
    return results.map(result => result.toJSON() as HistoricoTazaCambioData);
  }
};

