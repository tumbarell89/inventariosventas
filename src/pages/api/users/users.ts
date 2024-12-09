import type { APIRoute } from 'astro';
import { verifyJWT } from '../../../middlewares/authMiddleware';
import { searchUsers, createUserNegocio, updateUser, deleteUser } from '../../../controllers/userController';

export const GET: APIRoute = async (context) => {
  try {
    const authenticatedRequest = await verifyJWT(context);
    const userId = authenticatedRequest.user?.userId;

    if (!userId) {
      throw new Error('User ID not found in token');
    }

    const query = context.url.searchParams.get('q') || '';
    const result = await searchUsers(query, userId);
    return new Response(JSON.stringify({ users: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error searching users:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async (context) => {
  try {
    const authenticatedRequest = await verifyJWT(context);
    const userId = authenticatedRequest.user?.userId;

    if (!userId) {
      throw new Error('User ID not found in token');
    }

    const body = await context.request.json();
    console.log(body);
    const result = await createUserNegocio({ ...body, admin_id: userId, id_tipo_usuario:body.tipo });
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
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
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to update user' }), {
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
    console.log(id);
    const result = await deleteUser(id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

Response