import { supabase } from './supabase';
import bcrypt from 'bcryptjs';
import type { User } from './supabasenegocio';

// const MAX_ATTEMPTS = 5
// const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutos en milisegundos
//const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' // Asegúrate de configurar esto en tu .env

const MAX_ATTEMPTS = import.meta.env.PUBLIC_MAX_ATTEMPTS;
const LOCKOUT_TIME = import.meta.env.PUBLIC_LOCKOUT_TIME;

async function checkLoginAttempts(telefono: string, ipAddress: string): Promise<boolean> {
  await supabase.rpc('clean_old_attempts')
  console.debug('mirarme');
  const { count } = await supabase
    .from('login_attempts')
    .select('id', { count: 'exact' })
    .eq('telefono', telefono)
    .gt('attempt_time', new Date(Date.now()).toISOString())
    console.debug('mirarme23323');
  if (count && count >= MAX_ATTEMPTS) {
    return false // Usuario bloqueado
  }

  await supabase.from('login_attempts').insert({ telefono, ip_address: ipAddress })
  console.debug('mi334343');
  return true // Usuario no bloqueado
}

export async function loginUser_old(telefono: string, contrasena: string, ipAddress: string):  Promise<{ user: User | null }>{
    const canAttempt = await checkLoginAttempts(telefono, ipAddress)
  if (!canAttempt) {
    throw new Error('Demasiados intentos de inicio de sesión. Por favor, inténtelo de nuevo más tarde.')
  }
  console.debug('4545');
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('telefono', telefono)
      //.eq('contrasena', contrasena)
      .single();
    if (error || !data) {
      console.error('Error during login:', error)
      return { user: null };
    }
    const isValidPassword = await bcrypt.compare(contrasena, data.contrasena)
    if (!isValidPassword) {
        throw new Error('Contraseña incorrecta')
    }

    if (data.contrasena !== contrasena) {
      console.error('Incorrect password')
      return { user: null };
    }
   
    const user: User = {
      id: data.id,
      telefono: data.telefono,
      nombre_negocio: data.nombre_negocio,
      es_admin: data.es_admin,
      admin_id: data.admin_id,
      tipo: data.tipo
    }
  
    // Store user information in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
    }
    return { user }
  }
  
  export async function logout() {
    try {
      // Eliminar el token del localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
  
      // Opcionalmente, si quieres mantener un registro de los tokens invalidados en el servidor:
    //   const token = localStorage.getItem('authToken')
    //   if (token) {
    //     await supabase.from('invalid_tokens').insert({ token })
    //   }
  
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = '/'
  
      return true
    } catch (error) {
      console.error('Error during logout:', error)
      return false
    }
  }
  
  export function getCurrentUser(): User | null {
    const token = localStorage.getItem('authToken')!;

    
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }
  
  export function isLoggedIn(): boolean {    
    return !!getCurrentUser()
  }

const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function registerUser(telefono: string, contrasena: string, nombreNegocio: string) {
  try {
    const hashedPassword = await hashPassword(contrasena)
    
    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        { telefono, contrasena: hashedPassword, nombre_negocio: nombreNegocio }
      ])
      .single()

    if (error) throw error

    return { data }
  } catch (error) {
    console.error('Error en registerUser:', error)
    throw error
  }
}

export async function loginUser(telefono: string, contrasena: string, ipAddress: string) {
  try {
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('telefono', telefono)
      .single()

    if (error) throw error
    if (!user) throw new Error('Usuario no encontrado')

    const isValidPassword = await comparePassword(contrasena, user.contrasena)
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta')
    }

    // Registrar el intento de inicio de sesión
    await supabase.from('login_attempts').insert({ telefono, ip_address: ipAddress })

    // No devolver la contraseña hasheada
    const { contrasena: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword }
  } catch (error) {
    console.error('Error en loginUser:', error)
    throw error
  }
}