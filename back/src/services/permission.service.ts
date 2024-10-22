import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { PermissionDto } from '../dtos/permission.dto';
import { NotFoundException } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
     ) {}

    async createDefaultPermissions(): Promise<void> {
        const permissions = [
            { name: 'CRUD Tareas personales', description: 'Permite crear, leer, editar y eliminar tareas personales', category: 'Tareas' },
            { name: 'CRUD Tareas de equipo', description: 'Permite crear, leer, editar y eliminar tareas de equipo', category: 'Tareas' },
            { name: 'Ver Equipos', description: 'Permite ver los equipos de la organización', category: 'Equipos' },
            { name: 'CRUD Equipos', description: 'Permite crear, leer, editar y eliminar equipos', category: 'Equipos' },
            { name: 'CRUD Passwords personales', description: 'Permite crear, leer, editar y eliminar passwords personales', category: 'Passwords' },
            { name: 'Ver Proyectos', description: 'Permite ver los proyectos de la organización', category: 'Proyectos' },
            { name: 'CRUD Proyectos', description: 'Permite crear, leer, editar y eliminar proyectos', category: 'Proyectos' },
            { name: 'Ver Usuarios', description: 'Permite ver los usuarios de la organización', category: 'Usuarios' },
            { name: 'Eliminar Usuario', description: 'Permite eliminar un usuario', category: 'Usuarios' },
            { name: 'Invitar Usuario', description: 'Permite invitar a un usuario a la organización', category: 'Usuarios' },
            { name: 'Gestionar Solicitudes', description: 'Permite gestionar solicitudes de usuarios', category: 'Usuarios' },
            { name: 'Recursos Humanos', description: 'Ver calendario de empleados, ver tabla de empleados, ver resumen de empleados', category: 'Recursos Humanos' },

        ];

        permissions.forEach(async permission => {
            const permissionEntity = this.permissionRepository.create(permission);
            await this.permissionRepository.save(permissionEntity);
        });
    }



    async getAllPermissions(): Promise<Permission[]> {
        
        return this.permissionRepository.find();
    }


    async getPermissionById(id: number): Promise<Permission> {
        return this.permissionRepository.findOne({ where: { permissionId: id } });
    }


}