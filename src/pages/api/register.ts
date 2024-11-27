import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ request }) => {
  const { telefono, contrasena, nombreNegocio } = await request.json();

  try {
    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('usuarios')
      .select('telefono')
      .eq('telefono', telefono)
      .single();

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'El usuario ya existe' }), { status: 409 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el nuevo usuario
    const { data: newUser, error } = await supabase
      .from('usuarios')
      .insert([
        { telefono, contrasena: hashedPassword, nombre_negocio: nombreNegocio, es_admin: true, tipo: null }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error al registrar usuario:', error);
      return new Response(JSON.stringify({ error: 'Error al registrar usuario' }), { status: 500 });
    }

    // Eliminar la contraseña del objeto usuario antes de enviarlo
    delete newUser.contrasena;

    return new Response(JSON.stringify({ user: newUser }), { status: 201 });
  } catch (error) {
    console.error('Error en el registro:', error);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
  }
};