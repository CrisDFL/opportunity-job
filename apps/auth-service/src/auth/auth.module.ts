import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController], // Se registra el controlador
  providers: [AuthService], // Se registra el servicio
})
export class AuthModule {} //Va vacia porque ya se configuro todo dentro del decorador
