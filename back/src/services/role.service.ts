import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleDto } from '../dtos/role.dto';
import { NotFoundException } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { PermissionService } from './permission.service';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private organizationService: OrganizationService,
        private permissionService: PermissionService
    ) {}



    async createRole(roleDto: RoleDto): Promise<Role> {
        var role = new Role();
        const organization = await this.organizationService.getOrganizationById(roleDto.organizationId);
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }


        for (const permissionId of roleDto.permissions) {
            const permission = await this.permissionService.getPermissionById(permissionId);
            if (!permission) {
                throw new NotFoundException('Permission not found');
            }
            role.permissions.push(permission);
        }
        role = { 
            ...roleDto, 
            organization: organization,
            permissions: []
        };

        return this.roleRepository.save(role);
    }
    async getAllOrganizationRoles(organizationId: number): Promise<Role[]> {
        const organization = await this.organizationService.getOrganizationById(organizationId);
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }
        return this.roleRepository.find({ where: { organization: organization } });
    }

    async getRoleById(id: number): Promise<Role> {
        return this.roleRepository.findOne({ where: { roleId: id }});
    }



    async updateRole(id: number, roleDto: RoleDto): Promise<Role> {
        const organization = await this.organizationService.getOrganizationById(roleDto.organizationId);
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }
        var role = await this.getRoleById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        role.organization = organization;
        role.permissions = [];
        for (const permissionId of roleDto.permissions) {
            const permission = await this.permissionService.getPermissionById(permissionId);
            if (!permission) {
                throw new NotFoundException('Permission not found');
            }
            role.permissions.push(permission);
        }
        role = { 
            ...roleDto, 
            organization: organization,
            permissions: []
        };
        await this.roleRepository.update (id, role);


        return this.getRoleById(id);
    }

    async deleteRole(id: number): Promise<boolean> {
        const result = await this.roleRepository.delete(id);
        return result.affected > 0;
        
    }
}