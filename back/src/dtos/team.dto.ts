import { ApiProperty  } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class TeamDto {
    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    teamId?: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    organizationId: number;
    
}