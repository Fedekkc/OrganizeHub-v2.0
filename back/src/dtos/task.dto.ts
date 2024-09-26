import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    taskId?: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    priority: string;

    @ApiProperty( {required: true} )
    @IsNumber()
    assignedToId: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    projectId?: number;

    @ApiProperty({ required: true })
    @IsNumber()
    @IsOptional()
    createdById?: number;

    @ApiProperty({ required: false, type: String, format: 'date-time' })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    createdAt?: Date;

    @ApiProperty({ required: true, type: String, format: 'date-time' })
    @IsDate()
    @Type(() => Date)
    dueDate: Date;

    @ApiProperty({ required: false, type: String, format: 'date-time' })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    updatedAt?: Date;
}