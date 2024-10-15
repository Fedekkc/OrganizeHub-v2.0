import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

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

    @ApiProperty({required:false, type: [Number] })
    @IsNumber({}, { each: true })
    @IsOptional()
    users?: number[];

    @ApiProperty({type: Number})
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @ApiProperty({ required: false, type: [Number] })
    @IsNumber({}, { each: true })
    @IsOptional()
    tasks?: number[];

    @ApiProperty({ required: false })
    @IsString()
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
    organizationId: number;


   
}