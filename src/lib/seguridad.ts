import bcrypt from 'bcryptjs';
import type { User } from './types';

// const MAX_ATTEMPTS = 5
// const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutos en milisegundos
//const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' // Asegúrate de configurar esto en tu .env

const MAX_ATTEMPTS = import.meta.env.PUBLIC_MAX_ATTEMPTS;
const LOCKOUT_TIME = import.meta.env.PUBLIC_LOCKOUT_TIME;
  
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
