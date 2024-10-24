import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from 'src/controllers/team.controller';
import { Team } from 'src/entities/team.entity';
import { TeamService } from 'src/services/team.service';
import { UserModule } from './user.module';
import { OrganizationModule } from './organization.module';

@Module({
    imports: [TypeOrmModule.forFeature([Team]),
    UserModule,
    OrganizationModule
],
    providers: [TeamService],
    controllers: [TeamController],
    exports: [TeamService]
})
export class TeamModule {}