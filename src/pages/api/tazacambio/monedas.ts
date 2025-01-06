import type { APIRoute } from 'astro';
import { getMonedas, createMoneda, deleteMoneda } from '../../../controllers/monedaController';
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

export const DELETE: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const body = await context.request.json();
    const { id } = body;
    if (!id) {
      throw new Error('ID no proporcionado');
    }
    const monedaId = parseInt(id, 10);
    await deleteMoneda(monedaId);
    return new Response(JSON.stringify({ message: 'Moneda eliminada exitosamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting moneda:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete moneda' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

