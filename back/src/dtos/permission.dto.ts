import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../entities/role.entity';

export class PermissionDto {
    @IsOptional()
    permissionId?: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    category: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => Role)
    roles?: Role[];
}