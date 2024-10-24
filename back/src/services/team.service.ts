import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { PartialTeamDto, TeamDto } from '../dtos/team.dto';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { OrganizationService } from './organization.service'
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
        private userService: UserService,
        private organizationService: OrganizationService,
    ) {}
    private readonly logger = new Logger(TeamService.name);

    async createTeam(teamDto: TeamDto): Promise<Team> {
        try {
            const users = await this.userService.getUsersByIds(teamDto.users);
            const organization = await this.organizationService.getOrganizationById(teamDto.organization);

            if (!organization) {
                throw new NotFoundException(`Organization with ID ${teamDto.organization} not found`);
            }

            const team = this.teamRepository.create({
                ...teamDto,
                users,
                organization,
            });
            this.logger.log("trying to create")
            const createdTeam = await this.teamRepository.save(team);
            this.logger.log(`Team with ID ${createdTeam.teamId} created`);
            return createdTeam;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    async getAllTeams(): Promise<Team[]> {
        return this.teamRepository.find({ relations: ['assignedTo', 'project', 'createdBy'] });
    }

    async getTeamById(id: number): Promise<Team> {
        return this.teamRepository.findOne({ where: { teamId: id }, relations: ['assignedTo', 'project', 'createdBy'] });
    }

    async getTeamsByOrganization(id: number): Promise<Team[]> {
        
        const query = this.teamRepository.createQueryBuilder('team');
        query.where('team.organization = :organization', { organization: id });
        query.leftJoinAndSelect('team.users', 'users');
        return await query.getMany();



    }


    async updateTeam(id: number, teamDto: PartialTeamDto): Promise<Team> {
        const team = await this.getTeamById(id);
        if (!team) {
            return null;
        }
        
        
        if (teamDto.users) {
            team.users = await this.userService.getUsersByIds(teamDto.users);
        }
        if (teamDto.organization) {
            team.organization = await this.organizationService.getOrganizationById(teamDto.organization);
        }
        if (teamDto.name) {
            team.name = teamDto.name;
        }


        await this.teamRepository.update(id, team);
        return this.getTeamById(id);
    }

    async deleteTeam(id: number): Promise<boolean> {
        const result = await this.teamRepository.delete(id);
        return result.affected > 0;
        
    }
}