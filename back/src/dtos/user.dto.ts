import { IsEmail, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty({ description: 'Identificador único del usuario' })
    @IsNumber()
    userId: number;

    @ApiProperty({ description: 'Nombre del usuario', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    name: string;

    @ApiProperty({ description: 'Apellido del usuario', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    surname: string;

    @ApiProperty({ description: 'Nombre de usuario', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    username: string;

    @ApiProperty({ description: 'Correo del usuario' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ description: 'Contraseña del usuario', minLength: 8, maxLength: 100 })
    @IsOptional()
    @IsString()
    @Length(8, 100)
    password?: string;

    @ApiProperty({ description: 'Fecha de registro del usuario' })
    createdAt: Date;

    @ApiProperty({ description: 'Fecha de actualizacion de datos del usuario' })
    updatedAt: Date;
}