import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // Decorador que define la ruta base para este controlador URL
export class AuthController {
  //Contructor donde va el servicio fijo de autenticacion
  //private = Asigna la propiedad en una sola linea
  constructor(private authService: AuthService) {}

  //Metodo para el registro de usuarios, recibe un DTO con los datos del usuario a registrar
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data); // Llama al método de registro del servicio de autenticación
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data); // Llama al método de inicio de sesión del servicio de autenticación
  }
}
