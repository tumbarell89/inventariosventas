import sequelize from '../config/database.js';

// Importa todos los modelos
import User from '../models/User.js';
import Oferta from '../models/Oferta.js';
import OperacionFinalizada from '../models/OperacionFinalizada.js';
import TipoOperacion from '../models/TipoOperacion.js';
import Jornada from '../models/Jornada.js';
import Producto from '../models/Producto.js';
import OperacionEntrada from '../models/OperacionEntrada.js';
import TazaCambio from '../models/TazaCambio.js';

// Función para inicializar la base de datos
export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincroniza los modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

export {
  User,
  Oferta,
  OperacionFinalizada,
  TipoOperacion,
  Jornada,
  Producto,
  OperacionEntrada,
  TazaCambio
};

