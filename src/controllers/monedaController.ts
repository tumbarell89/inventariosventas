import { monedaRepository } from '../lib/monedaRepository';

export const getMonedas = async () => {
  return await monedaRepository.getAll();
};

export const createMoneda = async (denominacion: string) => {
  return await monedaRepository.create(denominacion);
};

