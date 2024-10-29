import { IsEmail, IsOptional, IsString, Length, IsPhoneNumber, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDto {
    @ApiProperty({ required: false })
    @IsOptional()
    organizationId?: number;
    
    @ApiProperty({ required: false })
    @IsString()
    @Length(1, 100)
    name: string;

    @ApiProperty({ required: false })
    @IsNumber()
    owner: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Length(0, 255)
    description?: string;

    @ApiProperty({ required: false })
    @IsEmail()
    @Length(1, 100)
    email: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsPhoneNumber(null)
    @Length(0, 15)
    phone?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Length(0, 255)
    address?: string;
}

export class PartialOrganizationDto extends OrganizationDto {
        
    }