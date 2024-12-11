import type { APIRoute } from 'astro';
import { crearOperacionAlmacen, obtenerOperacionesAlmacen } from '../../../controllers/almacenController';
import { verifyJWT } from '../../../middlewares/authMiddleware';

export const get: APIRoute = async ({ request }) => {
  try {
    const { userId } = await verifyJWT(request);
    const operaciones = await obtenerOperacionesAlmacen(userId);
    return new Response(JSON.stringify(operaciones), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching operaciones:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch operaciones' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const post: APIRoute = async ({ request }) => {
  try {
    const { userId } = await verifyJWT(request);
    const operacionData = await request.json();
    operacionData.usuarioId = userId;
    const nuevaOperacion = await crearOperacionAlmacen(operacionData);
    return new Response(JSON.stringify(nuevaOperacion), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating operacion:', error);
    return new Response(JSON.stringify({ error: 'Failed to create operacion' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

