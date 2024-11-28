import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from 'src/controllers/task.controller';
import { Task } from 'src/entities/task.entity';
import { TaskService } from 'src/services/task.service';
import { UserModule } from './user.module';
@Module({
    imports: [TypeOrmModule.forFeature([Task]),
        forwardRef(() => UserModule)
],
    providers: [TaskService],
    controllers: [TaskController],
    exports: [TaskService]
})
export class TaskModule {} 