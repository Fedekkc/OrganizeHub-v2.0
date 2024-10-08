import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from 'src/controllers/project.controller';
import { Project } from 'src/entities/project.entity';
import { ProjectService } from 'src/services/project.service';
import { UserModule } from './user.module';
import { TaskModule } from './task.module';


@Module({
    imports: [TypeOrmModule.forFeature([Project]), UserModule, TaskModule],
    providers: [ProjectService],
    controllers: [ProjectController],
    exports: [ProjectService]
})
export class ProjectModule {}