import type { APIRoute } from 'astro';
import { register } from '../../../controllers/authController';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { telefono, nombre_negocio, id_tipo_usuario, correo, contrasena } = body;

  try {
    const result = await register({ telefono, nombre_negocio, id_tipo_usuario, correo, contrasena });
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error during registration:', error);
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message === 'El usuario ya existe' ? 400 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

