import type { APIRoute } from 'astro';
import { login } from '../../../controllers/authController';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { telefono, contrasena } = body;

  try {
    const result = await login({ telefono, contrasena });
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message === 'Usuario no encontrado' || err.message === 'Contraseña incorrecta' ? 400 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

