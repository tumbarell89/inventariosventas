import { supabase } from "./supabase";

export interface User {
    id: string;
    telefono: string;
    nombre_negocio: string;
    es_admin: boolean;
    admin_id: string;
    tipo: string;
  }

 export interface Oferta {
    id: number;
    producto: string;
    precio: number;
    disponible: boolean;
    usuario_id: number;
    negocio_id: number;
    sincronizado: boolean;
  }
 export interface NuevaOferta {
    producto: string;
    precio: number;
    usuario_id: number;
    negocio_id: number;
  }
  export interface ProductoVendido {
    producto: string;
    cantidad: number;
    total: number;
  }
  
  export interface ResumenDiario {
    fecha: string;
    productos: ProductoVendido[];
    total_ventas: number;
    cantidad_ventas: number;
    total_vendido_transferencia: number;
    total_vendido_sin_transferencia: number;
    monto_total_todas_ventas: number;
    monto_total_transferencia: number;
    monto_total_sin_transferencia: number;
    cant_total_de_ventas: number;
  }
  
 export interface Admin {
    id: string
    telefono: string
    nombre_negocio: string
  }
  
  export interface VentaFinalizada {
    id: number;
    fecha: string;
    items: {
      vendedor_telf: number;
      productos: { 
        producto: string;
        cantidad: number;
        precio: number;
      }[];
    };
    vendedor_telefono: number;
    comprobante: string
    total: number;
    sincronizado: boolean;
  }
  export interface VentaFinalLocal {
    id?: number;
    fecha: string;
    items: {
      vendedor_telf: number;
      productos: { 
        producto: string;
        cantidad: number;
        precio: number;
      }[]
    };
    vendedor_telefono: number
    total: number;
    sincronizado: boolean;
  }
