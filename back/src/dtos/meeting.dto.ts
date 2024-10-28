import { IsString, IsOptional, IsArray, IsEnum, IsNumber, IsDate, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
export class MeetingDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    meetingId?: number;

    @ApiProperty({ required: true })
    @IsString()
    @Length(1, 255)
    title: string;

    @ApiProperty({ required: true })
    @IsString()
    @Length(1, 1000)
    description: string;

    @ApiProperty({ required: true, enum: ['scheduled', 'in_progress', 'completed', 'canceled'] })
    @IsEnum(['scheduled', 'in_progress', 'completed', 'canceled'])
    status: string;

    @ApiProperty({ required: false, type: () => [User] })
    @IsOptional()
    @IsArray()
    assignedTo?: User[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    createdBy?: number;  // Usar el ID del usuario que crea la reunión

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDate()
    createdAt?: Date;
}

export class PartialMeetingDto extends MeetingDto {
}
