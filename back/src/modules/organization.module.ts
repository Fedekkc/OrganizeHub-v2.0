import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from 'src/controllers/organization.controller';
import { Organization } from 'src/entities/organization.entity';
import { OrganizationService } from 'src/services/organization.service';
import { UserModule } from './user.module';
import { TaskModule } from './task.module';
import { forwardRef } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Organization]), forwardRef(() => UserModule),TaskModule],
    providers: [OrganizationService],
    controllers: [OrganizationController],
    exports: [OrganizationService]
})
export class OrganizationModule {}