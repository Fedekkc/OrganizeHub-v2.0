import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationDto } from '../dtos/organization.dto';

@Injectable()
export class OrganizationService {
    private organizations: OrganizationDto[] = [];

    createOrganization(organizationDto: OrganizationDto): OrganizationDto {
        const newOrganization = { ...organizationDto, organizationId: this.organizations.length + 1 };
        this.organizations.push(newOrganization);
        return newOrganization;
    }

    getAllOrganizations(): OrganizationDto[] {
        return this.organizations;
    }

    getOrganizationById(organizationId: number): OrganizationDto {
        const organization = this.organizations.find(proj => proj.organizationId === organizationId);
        if (!organization) {
            throw new NotFoundException(`Organization with ID ${organizationId} not found`);
        }
        return organization;
    }

    updateOrganization(organizationId: number, updateData: Partial<OrganizationDto>): OrganizationDto {
        const organizationIndex = this.organizations.findIndex(proj => proj.organizationId === organizationId);
        if (organizationIndex === -1) {
            throw new NotFoundException(`Organization with ID ${organizationId} not found`);
        }
        const updatedOrganization = { ...this.organizations[organizationIndex], ...updateData };
        this.organizations[organizationIndex] = updatedOrganization;
        return updatedOrganization;
    }

    deleteOrganization(organizationId: number): void {
        const organizationIndex = this.organizations.findIndex(proj => proj.organizationId === organizationId);
        if (organizationIndex === -1) {
            throw new NotFoundException(`Organization with ID ${organizationId} not found`);
        }
        this.organizations.splice(organizationIndex, 1);
    }
}