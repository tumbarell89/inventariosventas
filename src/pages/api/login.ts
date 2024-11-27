import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST: APIRoute = async ({ request }) => {
  const { telefono, contrasena } = await request.json();
  console.debug('sdfsfsf');
  console.debug(telefono);
  console.debug(contrasena);
  try {
    // Buscar el usuario en la tabla 'usuarios'
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('telefono', telefono)
      .single();

    if (error || !user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
    }

    console.debug(user);
    if(!user.habilitado){
      return new Response(JSON.stringify({ error: 'Usuario y negocio deshabilitado contacte al equipo de SyncraSolution' }), { status: 401 });
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(contrasena, user.contrasena);

    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id, telefono: user.telefono, es_admin: user.es_admin },
      import.meta.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Eliminar la contraseña del objeto usuario antes de enviarlo
    delete user.contrasena;

    return new Response(JSON.stringify({ user, token }), { status: 200 });
  } catch (error) {
    console.error('Error en el login:', error);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
  }
};