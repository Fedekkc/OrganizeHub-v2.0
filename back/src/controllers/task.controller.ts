import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, SetMetadata, HttpCode } from "@nestjs/common";
import { TaskDto } from "../dtos/task.dto";
import { TaskService } from "../services/task.service";
import { Task } from "../entities/task.entity";
import { EntityNotFoundError } from "typeorm";

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @SetMetadata('isPublic', false)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllTasks(): Promise<Task[]> {
        try {
            return await this.taskService.getAllTasks();
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to get tasks', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SetMetadata('isPublic', false)
    @Get(':taskId')
    @HttpCode(HttpStatus.OK)
    async getTaskById(@Param('taskId') taskId: number): Promise<Task> {
        try {
            const task = await this.taskService.getTaskById(taskId);
            if (!task) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            return task;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to get task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SetMetadata('isPublic', false)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createTask(@Body() TaskDto: TaskDto): Promise<Task> {
        try {
            return await this.taskService.createTask(TaskDto);
        } catch (error) {
            throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SetMetadata('isPublic', false)
    @Put(':taskId')
    @HttpCode(HttpStatus.OK)
    async updateTask(@Param('taskId') taskId: number, @Body() TaskDto: TaskDto): Promise<Task> {
        try {
            const task = await this.taskService.updateTask(taskId, TaskDto);
            if (!task) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            return task;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to update task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':taskId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTask(@Param('taskId') taskId: number): Promise<void> {
        try {
            const result = await this.taskService.deleteTask(taskId);
            if (!result) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to delete task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}