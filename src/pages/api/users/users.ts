import type { APIRoute } from 'astro';
import { createUser, updateUser, deleteUser, searchUsers } from '../../../controllers/userController';
import { verifyJWT, type AuthenticatedRequest } from '../../../middleware/authMiddleware';

export const POST: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const body = await context.request.json();
    const { telefono, nombre_negocio, id_tipo_usuario, correo, contrasena } = body;

    const result = await createUser({ telefono, nombre_negocio, id_tipo_usuario, correo, contrasena });
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message === 'No token provided' || err.message === 'Failed to authenticate token' ? 401 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const body = await context.request.json();
    const { id, ...updateData } = body;

    const result = await updateUser(id, updateData);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message === 'No token provided' || err.message === 'Failed to authenticate token' ? 401 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const body = await context.request.json();
    const { id } = body;

    const result = await deleteUser(id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message === 'No token provided' || err.message === 'Failed to authenticate token' ? 401 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async (context) => {
  try {
    await verifyJWT(context);
    const query = context.url.searchParams.get('q') || '';

    const result = await searchUsers(query);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error searching users:', error);
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message === 'No token provided' || err.message === 'Failed to authenticate token' ? 401 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

