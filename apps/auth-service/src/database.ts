import { Pool } from 'pg';
import dotenv from 'dotenv';
// Configuración de la conexión a la base de datos utilizando variables de entorno

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
