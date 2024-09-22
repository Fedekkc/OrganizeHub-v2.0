import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty({ description: 'The unique identifier of the user' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'The name of the user', maxLength: 50 })
    @IsString()
    @Length(1, 50)
    name: string;

    @ApiProperty({ description: 'The email of the user' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ description: 'The password of the user', minLength: 8, maxLength: 100 })
    @IsOptional()
    @IsString()
    @Length(8, 100)
    password?: string;

    @ApiProperty({ description: 'The date the user was created' })
    createdAt: Date;

    @ApiProperty({ description: 'The date the user was last updated' })
    updatedAt: Date;
}