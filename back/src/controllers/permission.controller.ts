import { Controller, Get, Param, HttpException, HttpStatus, SetMetadata, HttpCode } from "@nestjs/common";
import { PermissionService } from "../services/permission.service";
import { Permission } from "../entities/permission.entity";
import { EntityNotFoundError } from "typeorm";

@Controller('permissions')
export class PermissionController {
    constructor(private permissionService: PermissionService) { }

    @SetMetadata('isPublic', false)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllPermissions(): Promise<Permission[]> {
        try {
            return await this.permissionService.getAllPermissions();
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Permissions not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to get permissions', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SetMetadata('isPublic', false)
    @Get(':permissionId')
    @HttpCode(HttpStatus.OK)
    async getPermissionById(@Param('permissionId') permissionId: number): Promise<Permission> {
        try {
            const permission = await this.permissionService.getPermissionById(permissionId);
            if (!permission) {
                throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
            }
            return permission;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to get permission', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}