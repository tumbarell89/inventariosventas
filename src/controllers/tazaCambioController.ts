import { tazaCambioRepository } from '../lib/tazaCambioRepository';
import { historicoTazaCambioRepository } from '../lib/historicoTazaCambioRepository';
import { monedaRepository } from '../lib/monedaRepository';
import type { TazaCambioData } from '../lib/types';

export const getTazasCambio = async (): Promise<Record<string, Record<string, number>>> => {
  const tazas = await tazaCambioRepository.getLatest();

   const result: Record<string, Record<string, number>> = await tazaCambioRepository.getLatest();
  // tazas.forEach((taza) => {
  //   if (taza.monedaOrigen && taza.monedaDestino) {
  //     const origenDenom = taza.monedaOrigen.denominacion;
  //     const destinoDenom = taza.monedaDestino.denominacion;
      
  //     if (!result[origenDenom]) {
  //       result[origenDenom] = {};
  //     }
  //     result[origenDenom][destinoDenom] = taza.valor;
  //   }
  // });
console.log(result);
  return result;
};

export const getLatestTazaCambio = async (): Promise<Record<string, Record<string, number>>> => {
  return getTazasCambio();
};

export const updateTazasCambio = async (tasas: Record<string, Record<string, number>>): Promise<void> => {
  const fecha = new Date();
  const monedas = await monedaRepository.getAll();

  const tazasCambioToUpdate: Omit<TazaCambioData, 'id'>[] = [];

  for (const [origenDenom, destinos] of Object.entries(tasas)) {
    for (const [destinoDenom, valor] of Object.entries(destinos)) {
      const monedaOrigen = monedas.find(m => m.denominacion === origenDenom);
      const monedaDestino = monedas.find(m => m.denominacion === destinoDenom);
      
      if (monedaOrigen && monedaDestino) {
        tazasCambioToUpdate.push({
          moneda_origen_id: monedaOrigen.id,
          moneda_destino_id: monedaDestino.id,
          valor,
          fecha
        });
      }
    }
  }

  await tazaCambioRepository.bulkUpsert(tazasCambioToUpdate);

  await historicoTazaCambioRepository.create({
    fecha,
    datos: tasas
  });
};

