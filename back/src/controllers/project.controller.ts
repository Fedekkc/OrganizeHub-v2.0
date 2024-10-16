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
  import { Logger } from '@nestjs/common';
  
  @Controller('projects')
  export class ProjectController {
    constructor(private readonly projectService: ProjectService,
    ) {}
    private logger: Logger = new Logger('ProjectController')

  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('logo', {
      storage: diskStorage({
        destination: './images',  
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);  
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }))    
    async createProject( @Body() projectDto: PartialProjectDto, @UploadedFile() file: Express.Multer.File) {
      try {
        const newProject = { ...projectDto, logo: file.filename }; 
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

    @Get('/all/:id')
    @HttpCode(HttpStatus.OK)
    async getProjectsByUserId(@Param('id') id: number) {
      const projects = await this.projectService.getProjectsByUserId(id);
      if (!projects) {
        throw new NotFoundException(`Projects not found`);
      }
      //obtener el archivo de imagen y enviarlo al cliente
      projects.forEach(project => {
        project.logo = `http://localhost:5000/${project.logo}`;
      });
      this.logger.log(`projects: ${projects}`);
      return projects;
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
  