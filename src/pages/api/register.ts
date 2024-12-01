import type { APIRoute } from 'astro';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ request }) => {
  const { telefono, contrasena, nombreNegocio, correo } = await request.json();

  try {
    
    const existingUser = await prisma.user.findUnique({
      where: { telefono },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'El usuario ya existe' }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    console.log('aqui llego');
    const newUser = await prisma.user.create({
      data: {
        telefono,
        contrasena: hashedPassword,
        nombre_negocio: nombreNegocio,
        es_admin: true,
        tipo: null,
        correo,
        habilitado: true,
      },
    });
    console.log('aqui tambien');

    const { contrasena: _, ...userWithoutPassword } = newUser;
    console.log('aqui bueno');
    return new Response(JSON.stringify({ user: userWithoutPassword }), { status: 201 });
  } catch (error) {
    console.error('Error en el registro:', error);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
  }
};

