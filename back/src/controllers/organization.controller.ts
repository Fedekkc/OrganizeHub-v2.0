import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpCode, HttpStatus, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { OrganizationDto } from '../dtos/organization.dto';

@Controller('organizations')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ transform: true }))
    createOrganization(@Body() organizationDto: OrganizationDto) {
        return this.organizationService.createOrganization(organizationDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllOrganizations() {
        return this.organizationService.getAllOrganizations();
    }

    @Get(':id/users')
    @HttpCode(HttpStatus.OK)
    async getOrganizationUsers(@Param('id') id: number){
        const organization = await this.organizationService.getOrganizationById(id);
        if (!organization) {
            throw new NotFoundException(`Organization with ID ${id} not found`);
        }
        return this.organizationService.getOrganizationUsers(organization);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOrganizationById(@Param('id') id: number) {
        const organization = this.organizationService.getOrganizationById(id);
        if (!organization) {
            throw new NotFoundException(`Organization with ID ${id} not found`);
        }
        return organization;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ transform: true }))
    updateOrganization(@Param('id') id: number, @Body() updateData: OrganizationDto) {
        

        return this.organizationService.updateOrganization(id, updateData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteOrganization(@Param('id') id: number) {
        this.organizationService.deleteOrganization(id);
    }
}