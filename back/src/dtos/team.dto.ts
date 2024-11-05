import { ApiProperty  } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class TeamDto {
    @ApiProperty({ required: false, type: Number })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    teamId?: number;

    @ApiProperty({ type: String })
    @IsString()
    @Type(() => String)
    name: string;

    @ApiProperty({ type: Number })
    @IsNumber()
    @Type(() => Number)
    organization: number;

    @ApiProperty({ required: false, type: [Number] })
    @IsOptional()
    @Type(() => Number)
    users?: number[];

    
}

export class PartialTeamDto extends PartialType(TeamDto) {}
