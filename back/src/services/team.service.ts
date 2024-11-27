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
                users: [],
                organization,
            });

            this.logger.log("trying to create");
            this.logger.log(team);

            const createdTeam = await this.teamRepository.save(team);

            createdTeam.users = users;
            await this.teamRepository.save(createdTeam);

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
        try {
            const team = await this.teamRepository.findOne({ where: { teamId: id }, relations: ['users', 'tasks'] });
            if (!team) {
                throw new NotFoundException(`Team with ID ${id} not found`);
            }
            return team;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    async getTeamsByOrganization(id: number): Promise<Team[]> {
        
        const query = this.teamRepository.createQueryBuilder('team');
        query.where('team.organization = :organization', { organization: id });
        query.leftJoinAndSelect('team.users', 'users');
        return await query.getMany();



    }

    async addUserToTeam(teamId: number, userId: number): Promise<boolean> {
        try {
            const team = await this.getTeamById(teamId);
            if (!team) {
                return false;
            }
            const user = await this.userService.getUserById(userId);
            if (!user) {
                return false;
            }
            team.users.push(user);
            await this.teamRepository.save(team);
            return true;
            
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(error);

            
        }
    }

    async updateTeam(id: number, teamDto: PartialTeamDto): Promise<Team> {
        try {
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
            
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
            
        }
        
    }

    async deleteTeam(id: number): Promise<Boolean> {
        
        try {
            
            const team = await this.getTeamById(id);
            if (!team) {
                return null;
            }
            await this.teamRepository.delete(id);
            return true;

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
            
        }
        
    }

    async removeUserFromTeam(teamId: number, userId: number): Promise<Team> {
        const team = await this.getTeamById(teamId);
        if (!team) {
            return null;
        }
        team.users = team.users.filter(user => user.userId !== userId);
        await this.teamRepository.save(team);
        return team;
    }

}