import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

    @ApiProperty({ type: [Number] })
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    users: number[];

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @ApiProperty({ type: [Number] })
    @IsNumber({}, { each: true })
    @IsOptional()
    tasks?: number[];
}