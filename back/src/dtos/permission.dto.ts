import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
    @ApiProperty( { required: false })
    @IsOptional()
    permissionId?: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => Role)
    roles?: Role[];
}