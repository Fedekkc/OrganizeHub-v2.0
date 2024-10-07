import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { TeamDto } from '../dtos/team.dto';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
    ) {}

    async createTeam(teamDto: TeamDto): Promise<Team> {
        const team = this.teamRepository.create(teamDto);
        return this.teamRepository.save(team);
    }

    async getAllTeams(): Promise<Team[]> {
        return this.teamRepository.find({ relations: ['assignedTo', 'project', 'createdBy'] });
    }

    async getTeamById(id: number): Promise<Team> {
        return this.teamRepository.findOne({ where: { teamId: id }, relations: ['assignedTo', 'project', 'createdBy'] });
    }


    async updateTeam(id: number, teamDto: TeamDto): Promise<Team> {
        await this.teamRepository.update(id, teamDto);
        return this.getTeamById(id);
    }

    async deleteTeam(id: number): Promise<boolean> {
        const result = await this.teamRepository.delete(id);
        return result.affected > 0;
        
    }
}