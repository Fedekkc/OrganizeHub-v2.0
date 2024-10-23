import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class RoleDto {
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    roleId?: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    name: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    description: string;

    @ApiProperty()
    @IsNumber() 
    @Type(() => Number)
    organizationId: number;

    @ApiProperty({type: [Number]})
    @IsNumber({}, { each: true })
    @Type(() => Number)
    permissions?: number[];

}