import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
    HttpCode,
    HttpStatus,
    UsePipes,
    ValidationPipe,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { ProjectService } from '../services/project.service';
  import { ProjectDto, PartialProjectDto } from '../dtos/project.dto';
  import { Multer } from 'multer';
  
  @Controller('projects')
  export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProject(
      @Body() projectDto: PartialProjectDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      try {
        const logoUri = file ? `/images/${file.filename}` : null; 
        const newProject = { ...projectDto, logo: logoUri }; 
        return await this.projectService.createProject(newProject);
      } catch (error) {
        throw new NotFoundException('Error creating project: ' + error.message);
      }
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
    updateProject(@Param('id') id: number, @Body() updateData: ProjectDto) {
      return this.projectService.updateProject(id, updateData);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteProject(@Param('id') id: number) {
      this.projectService.deleteProject(id);
    }
  }
  