import type { APIRoute } from 'astro';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST: APIRoute = async ({ request }) => {
  const { telefono, contrasena } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { telefono },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
    }

    if (!user.habilitado) {
      return new Response(JSON.stringify({ error: 'Usuario y negocio deshabilitado. Contacte al equipo de SyncraSolution' }), { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(contrasena, user.contrasena);

    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, telefono: user.telefono, es_admin: user.es_admin },
      import.meta.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { contrasena: _, ...userWithoutPassword } = user;

    return new Response(JSON.stringify({ user: userWithoutPassword, token }), { status: 200 });
  } catch (error) {
    console.error('Error en el login:', error);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
  }
};

