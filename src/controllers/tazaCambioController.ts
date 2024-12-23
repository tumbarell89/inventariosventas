import { tazaCambioRepository } from '../lib/tazaCambioRepository';
import { historicoTazaCambioRepository } from '../lib/historicoTazaCambioRepository';
import { monedaRepository } from '../lib/monedaRepository';

export const getTazasCambio = async (): Promise<Record<string, Record<string, number>>> => {
  const tazas = await tazaCambioRepository.getLatest();

  const result: Record<string, Record<string, number>> = {};
  tazas.forEach((taza) => {
    if (taza.monedaOrigen && taza.monedaDestino) {
      const origenDenom = taza.monedaOrigen.denominacion;
      const destinoDenom = taza.monedaDestino.denominacion;
      
      if (!result[origenDenom]) {
        result[origenDenom] = {};
      }
      result[origenDenom][destinoDenom] = taza.valor;
    }
  });

  return result;
};

export const updateTazasCambio = async (tasas: Record<string, Record<string, number>>) => {
  const fecha = new Date();
  const monedas = await monedaRepository.getAll();

  // Actualizar tazas de cambio
  for (const [origenDenom, destinos] of Object.entries(tasas)) {
    for (const [destinoDenom, valor] of Object.entries(destinos)) {
      const monedaOrigen = monedas.find(m => m.denominacion === origenDenom);
      const monedaDestino = monedas.find(m => m.denominacion === destinoDenom);
      
      if (monedaOrigen && monedaDestino) {
        await tazaCambioRepository.upsert({
          moneda_origen_id: monedaOrigen.id,
          moneda_destino_id: monedaDestino.id,
          valor,
          fecha
        });
      }
    }
  }

  // Guardar en histórico
  await historicoTazaCambioRepository.create({
    fecha,
    datos: tasas
  });
};

