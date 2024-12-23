import type { APIRoute } from 'astro';
import { getMonedas, createMoneda } from '../../../controllers/monedaController';
import { verifyJWT } from '../../../middlewares/authMiddleware';

export const GET: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const monedas = await getMonedas();
    return new Response(JSON.stringify(monedas), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching monedas:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch monedas' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const body = await context.request.json();
    const { denominacion } = body;
    const newMoneda = await createMoneda(denominacion);
    return new Response(JSON.stringify(newMoneda), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating moneda:', error);
    return new Response(JSON.stringify({ error: 'Failed to create moneda' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

