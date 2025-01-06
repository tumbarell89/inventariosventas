import { monedaRepository } from '../lib/monedaRepository';
import { tazaCambioRepository } from '../lib/tazaCambioRepository';

export const getMonedas = async () => {
  return await monedaRepository.getAll();
};

export const createMoneda = async (denominacion: string) => {
  try {
    const newMoneda = await monedaRepository.create(denominacion);
    await tazaCambioRepository.createInitialRates(newMoneda.id);
    return newMoneda;
  } catch (error) {
    console.error('Error in createMoneda:', error);
    throw error;
  }
};

export const deleteMoneda = async (id: number) => {
  try {
    await tazaCambioRepository.deleteRatesForMoneda(id);
    await monedaRepository.delete(id);
  } catch (error) {
    console.error('Error in deleteMoneda:', error);
    throw error;
  }
};

