import { IsEmail, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { ManyToMany } from 'typeorm';
import { Project } from 'src/entities/project.entity';
import { Type } from 'class-transformer';

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

    @ApiProperty({ description: 'Fecha de actualización de datos del usuario' })
    @IsOptional()
    updatedAt?: Date;

    @ApiProperty({ description: 'Rol del usuario', enum: ['admin', 'user'], default: 'user' })
    @IsOptional()
    @IsString()
    role?: string;

    @ApiProperty({ description: 'Proyectos a los que pertenece el usuario' })
    @IsOptional()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    projects?: number[];

    @ApiProperty({ description: 'Foto de perfil del usuario' })
    @IsOptional()
    avatar?: string;

    @ApiProperty({ description: 'Organización a la que pertenece el usuario' })
    @IsOptional()
    @IsNumber()
    organization?: number;
}

export class PartialUserDTO extends PartialType(UserDTO) {
    // No es necesario agregar nada adicional, ya que PartialType hace que todos los campos sean opcionales
}
