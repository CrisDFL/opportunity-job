import { IsEmail, IsString, MinLength } from 'class-validator';

// DTO (Clase - Plantilla) para el registro de usuarios
export class RegisterDto {
    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}
