import { Injectable, NotFoundException } from '@nestjs/common';
import { PartialProjectDto, ProjectDto } from '../dtos/project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { UserService } from './user.service';
import { TaskService } from './task.service';
import { OrganizationService } from './organization.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Inject, forwardRef } from '@nestjs/common';


@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private taskService: TaskService,
        private organizationService: OrganizationService

    ) {}




    async createProject(projectDto: PartialProjectDto): Promise<Project> {
        try {
            var users = [];
            var tasks = [];
            if (projectDto.users) {
                users = await this.userService.getUsersByIds(projectDto.users);
            }
            if (projectDto.tasks) {
                tasks = await this.taskService.getTasksByIds(projectDto.tasks);
            }

            const organization = await this.organizationService.getOrganizationById(projectDto.organizationId);
            if (!organization) {
                throw new NotFoundException('Organization not found');
            }


            const project = this.projectRepository.create({ ...projectDto, organization, users, tasks });

            const savedProject = await this.projectRepository.save(project);
            return savedProject;
        } catch (error) {
            throw new HttpException('Failed to create project: ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.find({ relations: ['users'] });
    }

    async getProjectById(id: number): Promise<Project> {
        return this.projectRepository.findOne({ where: { projectId: id }, relations: ['users'] });
    }
 
    async updateProject(id: number, projectDto: ProjectDto): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { projectId: id },
            relations: ['users', 'tasks'],          });
    
        if (!project) {
            throw new NotFoundException('Project not found');
        }
    
        // Si hay usuarios en el DTO, los buscamos
        if (projectDto.users) {
            const users = await this.userService.getUsersByIds(projectDto.users);
            project.users = users;  // Asignamos los usuarios al proyecto
        }
    
        // Si hay tareas en el DTO, las buscamos
        if (projectDto.tasks) {
            const tasks = await this.taskService.getTasksByIds(projectDto.tasks);
            project.tasks = tasks;  // Asignamos las tareas al proyecto
        }
    
        // Actualizamos el proyecto con los datos modificados
        Object.assign(project, projectDto);
    
        // Guardamos el proyecto con las relaciones actualizadas
        return this.projectRepository.save(project);
    }
    

    async deleteProject(id: number): Promise<boolean> {
        const result = await this.projectRepository.delete(id);
        return result.affected > 0;
        
    }

    async getProjectsByIds(projectIds: number[]): Promise<Project[]> {
        return this.projectRepository.find({ where: { projectId: In(projectIds) } });
    }

    async getProjectsByUserId(userId: number): Promise<Project[]> {
        return this.projectRepository.createQueryBuilder('project')
            .leftJoin('project.users', 'user')
            .where('user.userId = :userId', { userId })
            .getMany();
    }

    async addUsersToProject(projectId: number, userIds: number[]): Promise<Project> {
        const project = await this.getProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        const users = await this.userService.getUsersByIds(userIds);
        project.users = [...project.users, ...users];
        return this.projectRepository.save(project);
    }
}