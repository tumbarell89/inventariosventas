import { historicoTazaCambioRepository } from '../lib/historicoTazaCambioRepository';

export const getHistoricoTazasCambio = async () => {
  return await historicoTazaCambioRepository.getRecent();
};

