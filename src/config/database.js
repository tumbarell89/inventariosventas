import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // set to console.log to see the raw SQL queries
  ssl: process.env.NODE_ENV === 'production',
  pool: {
    max: 5, // Número máximo de conexiones
    min: 0, // Número mínimo de conexiones
    acquire: 30000, // Tiempo máximo en milisegundos para adquirir conexión
    idle: 10000, // Tiempo máximo que una conexión puede estar inactiva
  },
});

export default sequelize;

