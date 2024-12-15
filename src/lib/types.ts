export interface UserData {
  id?: string;
  telefono: string;
  nombre_negocio: string;
  admin_id: string;
  correo:string;
  es_admin?: boolean;
  contrasena: string;
  habilitado?: boolean;
  tipo?:string;
  id_tipo_usuario?: number;
  tipoUsuario?:TipoUsuarioData;
}

export interface TipoUsuarioData {
  id: number;
  nombre: string;
}

export interface LoginData {
  telefono: string;
  contrasena: string;
}

export interface PrecioCosto {
  moneda: string;
  precio: number;
}

export interface ProductoData {
  id: number;
  denominacion: string;
  procedencia: string;
  codigo: string;
}

export interface AlmacenData {
  id: number;
  precioCosto: PrecioCosto[];
  cantidad: number;
  usuarioId: string;
  productoId: number;
}

export interface ProductoAlmacen extends ProductoData {
  almacen: AlmacenData;
}

export interface OperacionAlmacenData {
  id?: number;
  tipo: 'entrada' | 'salida' | 'venta';
  fecha: Date;
  usuarioId: string;
  almacenId: number;
  cantidad: number;
  precioOperacion: PrecioCosto[];
}

