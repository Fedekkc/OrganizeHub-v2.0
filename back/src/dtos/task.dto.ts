import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskDto {
    @IsNumber()
    @IsOptional()
    taskId?: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsOptional()
    assignedToId?: number;

    @IsNumber()
    @IsOptional()
    projectId?: number;

    @IsNumber()
    @IsOptional()
    createdById?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    updatedAt?: Date;
}