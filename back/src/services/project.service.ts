import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectDto } from '../dtos/project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { UserService } from './user.service';
import { TaskService } from './task.service';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        private userService: UserService,
        private taskService: TaskService,

    ) {}




    async createProject(projectDto: ProjectDto): Promise<Project> {
        const users = await this.userService.getUsersByIds(projectDto.users);
        const tasks = await this.taskService.getTasksByIds(projectDto.tasks);
    
        const projectData = {
            ...projectDto,
            users: users, 
            tasks: tasks,
        };
    
        const project = this.projectRepository.create(projectData);
        return this.projectRepository.save(project);
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.find({ relations: ['users'] });
    }

    async getProjectById(id: number): Promise<Project> {
        return this.projectRepository.findOne({ where: { projectId: id }, relations: ['users'] });
    }
 
    async updateProject(id: number, projectDto: ProjectDto): Promise<Project> {
        const projectData = {
            ...projectDto,
            users: await this.userService.getUsersByIds(projectDto.users),
            tasks: await this.taskService.getTasksByIds(projectDto.tasks),
        };

        await this.projectRepository.update(id, projectData);
        return this.getProjectById(id);
    }

    async deleteProject(id: number): Promise<boolean> {
        const result = await this.projectRepository.delete(id);
        return result.affected > 0;
        
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