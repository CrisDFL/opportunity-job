import { Pool } from 'pg';
// Configuración de la conexión a la base de datos utilizando variables de entorno

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
