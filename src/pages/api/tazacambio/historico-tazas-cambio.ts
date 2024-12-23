import type { APIRoute } from 'astro';
import { verifyJWT } from '../../../middlewares/authMiddleware';
import { getHistoricoTazasCambio } from '../../../controllers/historicoTazaCambioController';

export const GET: APIRoute = async (context) => {
  try {
    console.log(context);
    await verifyJWT(context);
    const historico = await getHistoricoTazasCambio();
    return new Response(JSON.stringify(historico), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching historico de tazas de cambio:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch historico de tazas de cambio' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

