import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpCode, HttpStatus, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { ProjectDto } from '../dtos/project.dto';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ transform: true }))
    createProject(@Body() projectDto: ProjectDto) {
        return this.projectService.createProject(projectDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllProjects() {
        return this.projectService.getAllProjects();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProjectById(@Param('id') id: number) {
        const project = this.projectService.getProjectById(id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ transform: true }))
    updateProject(@Param('id') id: number, @Body() updateData: Partial<ProjectDto>) {
        return this.projectService.updateProject(id, updateData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteProject(@Param('id') id: number) {
        this.projectService.deleteProject(id);
    }
}