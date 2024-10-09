import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationDto } from '../dtos/organization.dto';
import { Organization } from '../entities/organization.entity';
import { UserService } from './user.service';
import { TaskService } from './task.service';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
        private userService: UserService,
        private taskService: TaskService,
    ) {}

    async createOrganization(organizationDto: OrganizationDto): Promise<Organization> {
        const orgData = {
            ...organizationDto,
            owner: this.userService.getUserById(organizationDto.ownerId),
        }

        const organization = this.organizationRepository.create(organizationDto);
        return this.organizationRepository.save(organization);
    }

    async getAllOrganizations(): Promise<Organization[]> {
        return this.organizationRepository.find({ relations: ['users'] });
    }

    async getOrganizationById(id: number): Promise<Organization> {
        const organization = await this.organizationRepository.findOne({
            where: { organizationId: id },
            relations: ['users'],
        });
        if (!organization) {
            throw new NotFoundException(`Organization with ID ${id} not found`);
        }
        return organization;
    }

    async updateOrganization(id: number, organizationDto: OrganizationDto): Promise<Organization> {
            

        await this.organizationRepository.update(id, organizationDto);
        return this.getOrganizationById(id);
    }

    async deleteOrganization(id: number): Promise<boolean> {
        const result = await this.organizationRepository.delete(id);
        return result.affected > 0;
    }

    async addUsersToOrganization(organizationId: number, userIds: number[]): Promise<Organization> {
        const organization = await this.getOrganizationById(organizationId);
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }
        const users = await this.userService.getUsersByIds(userIds);
        organization.users = [...organization.users, ...users];
        return this.organizationRepository.save(organization);
    }
}
