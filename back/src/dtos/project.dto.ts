import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ManyToMany } from 'typeorm';
import { User } from 'src/entities/user.entity';

export class ProjectDto {
    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    projectId?: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({type: [Number]})
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    @Type(() => Number)
    users: number[];


    @ApiProperty({type: Number})
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @ApiProperty({ required: false, type: [Number] })
    @IsNumber({}, { each: true })
    @IsOptional()
    tasks?: number[];

    @ApiProperty({ required: false })
    @IsOptional()
    logo?: string;
}

export class PartialProjectDto extends PartialType(ProjectDto) {

    // declarar campos obligatorios
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({type: Number})
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    organizationId: number;


   
}