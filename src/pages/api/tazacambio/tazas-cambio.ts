import type { APIRoute } from 'astro';
import { getTazasCambio, updateTazasCambio } from '../../../controllers/tazaCambioController';
import { verifyJWT } from '../../../middlewares/authMiddleware';

export const GET: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const tazasCambio = await getTazasCambio();
    return new Response(JSON.stringify(tazasCambio), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching tazas de cambio:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch tazas de cambio' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const body = await context.request.json();
    await updateTazasCambio(body);
    return new Response(JSON.stringify({ message: 'Tazas de cambio updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating tazas de cambio:', error);
    return new Response(JSON.stringify({ error: 'Failed to update tazas de cambio' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

