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

export interface MonedaData {
  id: number;
  denominacion: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TazaCambioData {
  id: number;
  moneda_origen_id: number;
  moneda_destino_id: number;
  valor: number;
  fecha: Date;
  createdAt?: Date;
  updatedAt?: Date;
  monedaOrigen?: { denominacion: string };
  monedaDestino?: { denominacion: string };
}

export interface HistoricoTazaCambioData {
  id: number;
  fecha: Date;
  datos: Record<string, Record<string, number>>;
  createdAt?: Date;
  updatedAt?: Date;
}




