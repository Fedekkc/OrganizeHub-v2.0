import { HttpException, Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationDto } from '../dtos/organization.dto';
import { Organization } from '../entities/organization.entity';
import { UserService } from './user.service';
import { TaskService } from './task.service';
import { Inject, forwardRef } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private taskService: TaskService,
    ) {}

    async createOrganization(organizationDto: OrganizationDto): Promise<Organization> {
        try {
            const owner = await this.userService.getUserById(organizationDto.owner);
            if (!owner) {
                throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
            }
            if (owner.organization) {
                throw new HttpException('User already has an organization', HttpStatus.BAD_REQUEST);
            }
            
            const test = await this.getOrganizationByEmail(organizationDto.email);
            if ( test!= null) {
                throw new HttpException( `Email already in use`, HttpStatus.BAD_REQUEST);
            }

            const orgData = {
                ...organizationDto,
                owner,
            };
            const organization = this.organizationRepository.create(orgData);
            await this.organizationRepository.save(organization);

            await this.userService.updateUser(owner.userId, { organization: organization.organizationId });

            return organization;
        } catch (error) {
            throw new HttpException('Failed to create organization: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllOrganizations(): Promise<Organization[]> {
        return this.organizationRepository.find({ relations: ['users'] });
    }

    async getOrganizationByName(name: string): Promise<Organization> {
        const organization = await this.organizationRepository.findOne({
            where: { name },
            relations: ['users'],
        });
        if (!organization) {
            throw new NotFoundException(`Organization with name ${name} not found`);
        }
        return organization
    }

    async getOrganizationUsers(organization: Organization): Promise<User[]> {
        try {
            return await this.userService.getUsersByOrganization(organization);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException('Users not found for the organization', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to get users for the organization: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getOrganizationByEmail(email: string): Promise<Organization> {
        const organization = await this.organizationRepository.findOne({
            where: { email },
            relations: ['users'],
        });
        if (!organization) {
            return null;
        }
        return organization;
    }

    async getOrganizationById(id: number): Promise<Organization> {
        const organization = await this.organizationRepository.findOne({
            where: { organizationId: id },
            relations: ['users','teams','roles'],
        });
        if (!organization) {
            throw new NotFoundException(`Organization with ID ${id} not found`);
        }
        return organization;
    }

    async updateOrganization(id: number, organizationDto: OrganizationDto): Promise<Organization> {
        const orgData = {
            ...organizationDto,
            owner: await this.userService.getUserById(organizationDto.owner),
        }            

        await this.organizationRepository.update(id, orgData);
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
