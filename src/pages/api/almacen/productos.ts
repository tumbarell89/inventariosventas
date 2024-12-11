import type { APIRoute } from 'astro';
import { crearProducto, obtenerProductos } from '../../../controllers/almacenController';
import { verifyJWT } from '../../../middlewares/authMiddleware';

export const get: APIRoute = async ({ request }) => {
  try {
    await verifyJWT(request);
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    const productos = await obtenerProductos(query);
    return new Response(JSON.stringify(productos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching productos:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch productos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const post: APIRoute = async ({ request }) => {
  try {
    await verifyJWT(request);
    const productoData = await request.json();
    const nuevoProducto = await crearProducto(productoData);
    return new Response(JSON.stringify(nuevoProducto), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating producto:', error);
    return new Response(JSON.stringify({ error: 'Failed to create producto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

