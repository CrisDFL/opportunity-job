import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
// Guard: Verifica si al hacer una peticion el token es valido antes de permitir ejecutar un servicio o controlador
export class JwtGuard implements CanActivate {
  constructor(private jwtToken: JwtService) {}

  // Metodo que retorna un booleano indicando si el usuario tiene acceso o no a la ruta protegida
  canActivate(context: ExecutionContext): boolean {
    // Obtiene el objeto de solicitud HTTP y extrae el encabezado de autorización
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers.authorization;

    if (!header) {
      throw new UnauthorizedException();
    } else {
      // Divide el encabezado en tipo y token, verificando que el formato sea correcto ('Bearer' 'token')
      const [tipo, token] = header.split(' ');

      if (!token || tipo !== 'Bearer') {
        throw new UnauthorizedException();
      }

      try {
        // Verifica el token JWT utilizando el servicio JwtService
        this.jwtToken.verify<Record<string, any>>(token);
        return true;
      } catch {
        throw new UnauthorizedException();
      }
    }
  }
}
