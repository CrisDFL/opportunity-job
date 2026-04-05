import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { pool } from '../database';

@Injectable() // Decorador que marca esta clase como un servicio inyectable en NestJS
export class AuthService {
  //Se injectan servicios y repositorios en el constructor
  constructor() {}

  //Metodos
  async register(data: RegisterDto) {
    // Hash de la contraseña utilizando bcrypt
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Inserción del nuevo usuario en la base de datos con manejo de conflictos
    const comprobacion = await pool.query(
      `
        INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *;
      `,
      [data.nombre, data.apellido, data.email, passwordHash],
    );
    // Si no se insertó ningún registro, significa que el usuario ya existe
    if (comprobacion.rowCount === 0) {
      throw new ConflictException('El usuario ya existe');
    } else {
      return { message: 'Usuario registrado exitosamente' };
    }
  }

  login(data: LoginDto) {
    return { message: 'Inicio de sesión exitoso' };
  }
}
