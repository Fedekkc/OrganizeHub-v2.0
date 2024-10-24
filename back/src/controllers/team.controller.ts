import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { TeamService } from '../services/team.service';
import { TeamDto } from '../dtos/team.dto';
import { Team } from '../entities/team.entity';

@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Post()
    async createTeam(@Body() teamDto: TeamDto): Promise<Team> {
        try {
            return await this.teamService.createTeam(teamDto);
        }
            catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);

            }
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getAllTeams(): Promise<Team[]> {
        try {
            return await this.teamService.getAllTeams();
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/organization/:id')
    async getTeamsByOrganization(@Param('id') id: number): Promise<Team[]> {
        try {
            return await this.teamService.getTeamsByOrganization(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getTeamById(@Param('id') id: number): Promise<Team> {
        try {
            return await this.teamService.getTeamById(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async updateTeam(@Param('id') id: number, @Body() teamDto: TeamDto): Promise<Team> {
        try {
            return await this.teamService.updateTeam(id, teamDto);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async deleteTeam(@Param('id') id: number): Promise<boolean> {
        try {
            return await this.teamService.deleteTeam(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}