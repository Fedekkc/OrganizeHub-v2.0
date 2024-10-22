import { ApiProperty } from "@nestjs/swagger";


export class RoleDto {
    
    @ApiProperty({ required: false })
    roleId?: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    organizationId: number;

    @ApiProperty()
    permissions: number[];

}