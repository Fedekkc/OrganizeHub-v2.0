import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from 'src/controllers/organization.controller';
import { Organization } from 'src/entities/organization.entity';
import { OrganizationService } from 'src/services/organization.service';
import { UserModule } from './user.module';
import { TaskModule } from './task.module';

@Module({
    imports: [TypeOrmModule.forFeature([Organization]), UserModule, TaskModule ],
    providers: [OrganizationService],
    controllers: [OrganizationController],
})
export class OrganizationModule {}