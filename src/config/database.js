import { Sequelize } from 'sequelize';
import pg from 'pg'; // Importa explícitamente el módulo 'pg'
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    dialectModule: pg, // Usa el módulo importado
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false
    },
    ssl: process.env.NODE_ENV === 'production',
    pool: {
        max: 5, // Número máximo de conexiones
        min: 0, // Número mínimo de conexiones
        acquire: 30000, // Tiempo máximo en milisegundos para adquirir conexión
        idle: 10000, // Tiempo máximo que una conexión puede estar inactiva
    },
});

export default sequelize;
