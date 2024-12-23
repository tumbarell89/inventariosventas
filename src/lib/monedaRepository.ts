import Moneda from '../models/Moneda';
import type { MonedaData } from './types';

export const monedaRepository = {
  async getAll(): Promise<MonedaData[]> {
    return await Moneda.findAll();
  },

  async create(denominacion: string): Promise<MonedaData> {
    return await Moneda.create({ denominacion });
  }
};

