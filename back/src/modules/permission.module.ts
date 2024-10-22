import { Module, OnModuleInit } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { PermissionController } from '../controllers/permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    providers: [PermissionService],
    controllers: [PermissionController],
    exports: [PermissionService]
})
export class PermissionModule implements OnModuleInit {
    constructor(private readonly permissionService: PermissionService) {}

    onModuleInit() {
        this.permissionService.createDefaultPermissions();
    }
}