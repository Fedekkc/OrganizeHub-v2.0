import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InvitationService } from '../services/invitation.service';
import { InvitationDto } from '../dtos/invitation.dto';
import { Invitation } from '../entities/invitation.entity';

@Controller('invitations')
export class InvitationController {
    constructor(private readonly invitationService: InvitationService) {}

    @Post()
    async create(@Body() createInvitationDto: InvitationDto): Promise<Invitation> {
        try {
            return await this.invitationService.create(createInvitationDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to create invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('accept/:id')
    async accept(@Param('id') id: number): Promise<Invitation> {
        try {
            return await this.invitationService.accept(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to accept invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('reject/:id')
    async reject(@Param('id') id: number): Promise<Invitation> {
        try {
            return await this.invitationService.reject(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to reject invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(): Promise<Invitation[]> {
        try {
            return await this.invitationService.findAll();
        } catch (error) {
            throw new HttpException('Failed to retrieve invitations: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Invitation> {
        try {
            return await this.invitationService.findOne(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to retrieve invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('url/:url')
    async getInvitationByUrl(@Param('url') url: string): Promise<Invitation> {
        try {
            return await this.invitationService.getInvitationByUrl(url);
        } catch (error) {
            throw new HttpException('Failed to retrieve invitation URL: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('email/:email')
    async getInvitationByEmail(@Param('email') email: string): Promise<Invitation> {
        try {
            return await this.invitationService.getInvitationByEmail(email);
        } catch (error) {
            throw new HttpException('Failed to retrieve invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateInvitationDto: InvitationDto): Promise<Invitation> {
        try {
            return await this.invitationService.update(id, updateInvitationDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to update invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        try {
            return await this.invitationService.remove(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to delete invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}