import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
/*
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: require('pg'),
  logging: false, // set to console.log to see the raw SQL queries
  ssl: process.env.NODE_ENV === 'production',
  pool: {
    max: 5, // Número máximo de conexiones
    min: 0, // Número mínimo de conexiones
    acquire: 30000, // Tiempo máximo en milisegundos para adquirir conexión
    idle: 10000, // Tiempo máximo que una conexión puede estar inactiva
  },
});

user= password=[YOUR-PASSWORD] host=aws-0-us-west-1.pooler.supabase.com port=6543 dbname=postgres
const database = new sequelize({
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    dialectModule: require('pg'),
    logging: false,
    dialectOptions: {
        timezone: process.env.db_timezone
    },
    define: {
        freezeTableName: true,
        timestamps: false
    }
});*/

const sequelize = new Sequelize({
    host: aws-0-us-west-1.pooler.supabase.com,
    port: 6543,
    username: postgres.dbrmomdhhwapardacerl,
    password: ControlOfertas,
    database: controlinventario,
    dialect: 'postgres',
    dialectModule: require('pg'),
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

