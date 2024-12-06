export interface UserData {
  id?: string;
  telefono: string;
  nombre_negocio: string;
  correo:string;
  es_admin?: boolean;
  contrasena: string;
  habilitado?: boolean;
  tipo?:string;
  id_tipo_usuario?: number;
}

export interface TipoUsuarioData {
  id: number;
  nombre: string;
}

export interface LoginData {
  telefono: string;
  contrasena: string;
}

