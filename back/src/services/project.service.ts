import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectDto } from '../dtos/project.dto';

@Injectable()
export class ProjectService {
    private projects: ProjectDto[] = [];

    createProject(projectDto: ProjectDto): ProjectDto {
        const newProject = { ...projectDto, projectId: this.projects.length + 1 };
        this.projects.push(newProject);
        return newProject;
    }

    getAllProjects(): ProjectDto[] {
        return this.projects;
    }

    getProjectById(projectId: number): ProjectDto {
        const project = this.projects.find(proj => proj.projectId === projectId);
        if (!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }
        return project;
    }

    updateProject(projectId: number, updateData: Partial<ProjectDto>): ProjectDto {
        const projectIndex = this.projects.findIndex(proj => proj.projectId === projectId);
        if (projectIndex === -1) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }
        const updatedProject = { ...this.projects[projectIndex], ...updateData };
        this.projects[projectIndex] = updatedProject;
        return updatedProject;
    }

    deleteProject(projectId: number): void {
        const projectIndex = this.projects.findIndex(proj => proj.projectId === projectId);
        if (projectIndex === -1) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }
        this.projects.splice(projectIndex, 1);
    }
}