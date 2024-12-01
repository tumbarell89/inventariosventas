import Dexie, { type Table } from 'dexie';
import type { VentaFinalizada } from './supabasenegocio';
import { insertarVenta } from './repositorios';

export interface Oferta {
  id: number;
  producto: string;
  precio: number;
  sincronizado: boolean;
  disponible: boolean;
  usuario_id: number;
  negocio_id:number;
}

export class MyAppDatabase extends Dexie {
  ofertas: Dexie.Table<Oferta, number>;
  ventas: Dexie.Table<VentaFinalizada, number>;

  constructor() {
    super('MyAppDatabase');
    this.version(1).stores({
      ofertas: '++id, producto, precio',
      ventas: '++id, fecha, total, sincronizado'
    });
    this.ofertas = this.table('ofertas');
    this.ventas = this.table('ventas');
  }
}
export const db = new MyAppDatabase();

export async function sincronizarVentas(user_id:string) {
  const ventasNoSincronizadas = await db.ventas
    .toArray();
  for (const venta of ventasNoSincronizadas) {
    try {
      if(venta.sincronizado==false){
        const { error } = await insertarVenta(venta.items, venta.total, user_id, String(venta.items.vendedor_telf));
        
        if (error) throw error;      
        await db.ventas.update(venta.id!, { sincronizado: true });
      }
    } catch (error) {

      console.error('Error al sincronizar venta:', error);
    }
  }
  await db.ventas.clear();
}

// Llamar a esta función periódicamente o cuando haya conexión a internet
export class MyDatabase extends Dexie {
  ofertas!: Table<Oferta>;
  ventas!: Table<VentaFinalizada>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      ofertas: '++id, producto, precio, sincronizado',
      ventas: '++id, fecha, total, sincronizado'
    });
  }
}
