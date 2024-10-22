import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class RoleDto {
    
    @ApiProperty({ required: false })
    @IsOptional()
    roleId?: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    organizationId: number;

    @ApiProperty()
    permissions?: number[];

}