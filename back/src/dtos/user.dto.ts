import { IsEmail, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class UserDTO {
    @ApiProperty({ description: 'Identificador único del usuario' })
    @IsOptional()
    @IsNumber()
    userId?: number;

    @ApiProperty({ description: 'Nombre del usuario', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    firstName: string;

    @ApiProperty({ description: 'Apellido del usuario', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    lastName: string;

    @ApiProperty({ description: 'Nombre de usuario', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    username: string;

    @ApiProperty({ description: 'Correo del usuario' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ description: 'Contraseña del usuario', minLength: 8, maxLength: 100 })
    @IsString()
    @Length(8, 100)
    password: string;

    @ApiProperty({ description: 'Fecha de registro del usuario' })
    @IsOptional()
    createdAt?: Date;

    @ApiProperty({ description: 'Fecha de actualizacion de datos del usuario' })
    @IsOptional()
    updatedAt?: Date;

    @ApiProperty({ description: 'Organización a la que pertenece el usuario' })
    @IsOptional()
    @IsNumber()
    organization?: number;

}

export class PartialUserDTO extends PartialType(UserDTO) {
    // Al extender de PartialType, todos los campos se vuelven opcionales
    

}

