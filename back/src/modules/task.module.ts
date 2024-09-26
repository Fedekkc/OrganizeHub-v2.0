import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from 'src/controllers/task.controller';
import { Task } from 'src/entities/task.entity';
import { TaskService } from 'src/services/task.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskService],
    controllers: [TaskController],
})
export class TaskModule {}