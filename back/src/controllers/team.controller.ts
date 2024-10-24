import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { TeamDto } from '../dtos/team.dto';
import { Team } from '../entities/team.entity';

@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post()
    async createTeam(@Body() teamDto: TeamDto): Promise<Team> {
        return this.teamService.createTeam(teamDto);
    }

    @Get()
    async getAllTeams(): Promise<Team[]> {
        return this.teamService.getAllTeams();
    }

    @Get('/organization/:id')
    async getTeamsByOrganization(@Param('id') id: number): Promise<Team[]> {
        return this.teamService.getTeamsByOrganization(id);
    }

    @Get(':id')
    async getTeamById(@Param('id') id: number): Promise<Team> {
        return this.teamService.getTeamById(id);
    }

    @Put(':id')
    async updateTeam(@Param('id') id: number, @Body() teamDto: TeamDto): Promise<Team> {
        return this.teamService.updateTeam(id, teamDto);
    }

    @Delete(':id')
    async deleteTeam(@Param('id') id: number): Promise<boolean> {
        return this.teamService.deleteTeam(id);
    }
}