import { IsEmail, IsString, MinLength } from 'class-validator';

// DTO (Clase - Plantilla) para el inicio de sesión de usuarios
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
