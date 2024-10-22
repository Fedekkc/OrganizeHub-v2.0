import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from 'src/controllers/role.controller';
import { RoleService } from 'src/services/role.service';
import { OrganizationModule } from './organization.module';
import { PermissionModule } from './permission.module';
import { Role } from 'src/entities/role.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Role]), 
    OrganizationModule,
    PermissionModule
],
    providers: [RoleService],
    controllers: [RoleController],
    exports: [RoleService]
})
export class RoleModule {}