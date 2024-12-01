import { User } from './types';

export async function login(telefono: string, contrasena: string): Promise<{ user: User; token: string }> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telefono, contrasena }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error en el inicio de sesión');
  }

  return await response.json();
}

export async function register(telefono: string, contrasena: string, nombreNegocio: string, correo: string): Promise<{ user: User }> {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telefono, contrasena, nombreNegocio, correo }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error en el registro');
  }

  return await response.json();
}

export async function getIp(): Promise<string> {
  const response = await fetch('/api/get-ip');
  if (!response.ok) {
    throw new Error(`No se pudo obtener la dirección IP: ${response.statusText}`);
  }
  const { ip } = await response.json();
  return ip;
}

