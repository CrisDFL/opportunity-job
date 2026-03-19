import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable() // Decorador que marca esta clase como un servicio inyectable en NestJS
export class AuthService {
  //Se injectan servicios y repositorios en el constructor
  constructor() {}

  //Metodos
  register(data: RegisterDto) {
    return { message: 'Registro exitoso' };
  }

  login(data: LoginDto) {
    return { message: 'Inicio de sesión exitoso' };
  }
}
