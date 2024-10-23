import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, SetMetadata, HttpCode } from "@nestjs/common";
import { RoleDto } from "../dtos/role.dto";
import { RoleService } from "../services/role.service";
import { Role } from "../entities/role.entity";
import { EntityNotFoundError } from "typeorm";
import { Logger } from "@nestjs/common";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) { }
    private readonly Logger = new Logger(RoleController.name);


    @Get('/organization/:organizationId')
    @HttpCode(HttpStatus.OK)
    async getAllRolesByOrganization(@Param('organizationId') organizationId: number): Promise<Role[]> {
        try {
            return await this.roleService.getAllOrganizationRoles(organizationId);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Failed to get roles', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            throw new HttpException('Failed to get roles', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    @SetMetadata('isPublic', false)
    @Get(':roleId')
    @HttpCode(HttpStatus.OK)
    async getRoleById(@Param('roleId') roleId: number): Promise<Role> {
        try {
            const role = await this.roleService.getRoleById(roleId);
            if (!role) {
                throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
            }
            return role;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to get role', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SetMetadata('isPublic', false)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createRole(@Body() RoleDto: RoleDto): Promise<Role> {
        this.Logger.log('Creating role');
        try {
            return await this.roleService.createRole(RoleDto);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
            }

            throw new HttpException('Failed to create role ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SetMetadata('isPublic', false)
    @Put(':roleId')
    @HttpCode(HttpStatus.OK)
    async updateRole(@Param('roleId') roleId: number, @Body() RoleDto: RoleDto): Promise<Role> {
        try {
            const role = await this.roleService.updateRole(roleId, RoleDto);
            if (!role) {
                throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
            }
            return role;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to update role', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':roleId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteRole(@Param('roleId') roleId: number): Promise<void> {
        try {
            const result = await this.roleService.deleteRole(roleId);
            if (!result) {
                throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to delete role', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}