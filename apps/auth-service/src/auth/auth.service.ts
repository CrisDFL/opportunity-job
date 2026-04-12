import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { pool } from '../database';
import { JwtService } from '@nestjs/jwt';

@Injectable() // Decorador que marca esta clase como un servicio inyectable en NestJS
export class AuthService {
  //Se injectan servicios y repositorios en el constructor
  constructor(private generateToken: JwtService) {}

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

  async login(data: LoginDto) {
    // Consulta para seleccionar al usuario por email
    const seleccionar = await pool.query(
      `
        SELECT * FROM usuarios WHERE email = $1
      `,
      [data.email],
    );
    // variable que almacena el resultado de la consulta
    const user = seleccionar.rows[0] as { id: number; password: string };

    if (seleccionar.rowCount === 0) {
      throw new UnauthorizedException('Cuenta no encontrada');
    }
    // Comparación de la contraseña proporcionada con el hash almacenado en la base de datos
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    } else {
      // Generación de un token JWT con el ID y email del usuario
      const token = this.generateToken.sign({
        id: user.id,
        email: data.email,
      });
      // Retorno del mensaje de éxito junto con el token generado al cliente
      return { message: 'Inicio exitoso', token: token };
    }
  }
}
