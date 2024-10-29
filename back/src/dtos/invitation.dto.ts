import { IsString, IsDate, IsNumber, IsEnum, IsEmail, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvitationDto {
    
    @ApiProperty({ 
        description: 'Estado de la invitación', 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending' 
    })
    @IsEnum(['pending', 'accepted', 'rejected'])
    status: 'pending' | 'accepted' | 'rejected';

    @ApiProperty({ description: 'Correo electrónico del usuario invitado' })
    @IsEmail()
    email: string;

    @ApiProperty({ type: Number, description: 'ID de la organización' })
    @Type(() => Number)
    organization: number;

    @ApiProperty({ type: Date, description: 'Fecha de la invitación' })
    @IsDate()
    @Type(() => Date)
    date: Date;
}

export class UpdateInvitationDto extends PartialType(CreateInvitationDto) {}

export class InvitationDto {
    @ApiProperty({ description: 'ID de la invitación' })
    @IsNumber()
    @IsOptional()
    invitationId?: number;

    @ApiProperty({ 
        description: 'Estado de la invitación', 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending' 
    })
    @IsEnum(['pending', 'accepted', 'rejected'])
    status: 'pending' | 'accepted' | 'rejected';

    @ApiProperty({ description: 'Correo electrónico del usuario invitado' })
    @IsEmail()
    email: string;

    @ApiProperty({ type: Number, description: 'ID de la organización' })
    @Type(() => Number)
    @IsNumber()
    organization: number;

    @ApiProperty({ type: Date, description: 'Fecha de la invitación' })
    @IsDate()
    @Type(() => Date)
    date: Date;
}
