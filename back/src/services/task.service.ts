import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskDto } from '../dtos/task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async createTask(taskDto: TaskDto): Promise<Task> {
        const task = this.taskRepository.create(taskDto);
        return this.taskRepository.save(task);
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find({ relations: ['assignedTo', 'project', 'createdBy'] });
    }

    async getTaskById(id: number): Promise<Task> {
        return this.taskRepository.findOne({ where: { taskId: id }, relations: ['assignedTo', 'project', 'createdBy'] });
    }



    async updateTask(id: number, taskDto: TaskDto): Promise<Task> {
        await this.taskRepository.update(id, taskDto);
        return this.getTaskById(id);
    }

    async deleteTask(id: number): Promise<boolean> {
        const result = await this.taskRepository.delete(id);
        return result.affected > 0;
        
    }
}