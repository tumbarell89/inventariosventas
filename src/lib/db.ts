import Dexie, { type Table } from 'dexie';
import type { Oferta, VentaFinalizada } from './supabasenegocio';

// export interface Oferta {
//   id?: number;
//   producto: string;
//   precio: number;
//   sincronizado: boolean;
// }

// export interface VentaFinalizada {
//   id: number;
//   fecha: string;
//   items: {
//     vendedor_telf: number;
//     productos: { 
//       producto: string;
//       cantidad: number;
//       precio: number;
//     }[]
//   };
//   total: number;
// }

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

export async function sincronizarVentas() {
  const ventasNoSincronizadas = await db.ventas
    .where('sincronizado')
    .equals('false')
    .toArray();

  for (const venta of ventasNoSincronizadas) {
    try {
      //await insertarVentaServidor(venta);
      await db.ventas.update(venta.id, { sincronizado: true });
    } catch (error) {
      console.error('Error al sincronizar venta:', error);
    }
  }
}

// Llamar a esta función periódicamente o cuando haya conexión a internet
// export class MyDatabase extends Dexie {
//   ofertas!: Table<Oferta>;
//   ventas!: Table<VentaFinalizada>;

//   constructor() {
//     super('MyDatabase');
//     this.version(1).stores({
//       ofertas: '++id, producto, precio, sincronizado',
//       ventas: '++id, fecha, total, sincronizado'
//     });
//   }
// }



// export async function sincronizarDatos() {
//   try {
//     // Sincronizar ofertas
//     //const ofertasNoSincronizadas = await db.ofertas.where('sincronizado').equals('false').toArray();
//     // Aquí iría tu lógica para enviar ofertasNoSincronizadas al servidor
    
//     // Sincronizar ventas
//     const ventasNoSincronizadas = await db.ventas.where('sincronizado').equals('false').toArray();
//     // Aquí iría tu lógica para enviar ventasNoSincronizadas al servidor

//     // Marcar como sincronizados después de éxito
//     //await db.ofertas.where('sincronizado').equals('false').modify({sincronizado: true});
//     await db.ventas.where('sincronizado').equals('false').modify({sincronizado: true});

//     console.debug('Sincronización completada');
//   } catch (error) {
//     console.error('Error durante la sincronización:', error);
//   }
// }