import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskDto } from '../dtos/task.dto';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) { }

    async getTasksByIds(taskIds: number[]): Promise<Task[]> {
        const tasks = [];
        if (!taskIds || taskIds.length === 0) {
            return tasks;
        }
        for (const taskId of taskIds) {
            const task = await this.taskRepository.findOne({ where: { taskId } });
            if (!task) {
                throw new NotFoundException(`Task with ID ${taskId} not found`);
            }
            tasks.push(task);
        }
        return tasks;
    }

    async getTasksByUserId(userId: number): Promise<Task[]> {
        // usando query builder
        const tasks = await this.taskRepository.createQueryBuilder('task')
            .leftJoinAndSelect('task.assignedTo', 'assignedTo')
            .where('assignedTo.userId = :userId', { userId })
            .getMany();
        return tasks;
    }

    async createTask(taskDto: TaskDto): Promise<Task> {
        const assignedTo = await this.userService.getUserById(taskDto.assignedToId);

        const task = this.taskRepository.create({
            ...taskDto,
            assignedTo,
        });
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