import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController], // Se registra el controlador
  providers: [AuthService], // Se registra el servicio
  // Configuración de modulos externos
  imports: [
    // Configuración del módulo JWT con una clave secreta y tiempo de expiración
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {} //Va vacia porque ya se configuro todo dentro del decorador
