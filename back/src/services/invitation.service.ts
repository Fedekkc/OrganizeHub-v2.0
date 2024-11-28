import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationDto } from '../dtos/invitation.dto';
import { Invitation } from '../entities/invitation.entity';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { UserService } from './user.service';
import { OrganizationService } from './organization.service';
import { Logger } from '@nestjs/common';
import { CustomMailerService } from './mail.service';

@Injectable()
export class InvitationService {
    constructor(
        @InjectRepository(Invitation)
        private readonly invitationRepository: Repository<Invitation>,
        private readonly userService: UserService,
        private readonly organizationService: OrganizationService,
        private readonly mailerService: CustomMailerService,
    ) {}

    private readonly logger = new Logger(InvitationService.name);

    async create(createInvitationDto: InvitationDto): Promise<Invitation> {
        try {
            const organization = await this.organizationService.getOrganizationById(createInvitationDto.organization);
            if (!organization) {
                throw new NotFoundException('Organization not found');
            }
            const user = await this.userService.getUserByEmail(createInvitationDto.email);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const invitationUrl = "http://localhost:3000/invitation/url/" + await this.createInvitationUrl();

            const invitation = this.invitationRepository.create({
                ...createInvitationDto,
                organization: organization,
                url: invitationUrl,
            });


            await this.mailerService.sendInvitationEmail(invitation.email,invitationUrl);


            return await this.invitationRepository.save(invitation);
        } catch (error) {
            throw new HttpException('Failed to create invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getInvitationByUrl(url: string): Promise<Invitation> {
        try {
            return await this.invitationRepository.findOne({ where: { url }, relations: ['organization'] });
        } catch (error) {
            throw new HttpException('Failed to retrieve invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createInvitationUrl(): Promise<string> {
        try {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            for (let i = 0; i < 40; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return randomString;            
        } catch (error) {
            throw new HttpException('Failed to create invitation URL: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    async getInvitationByEmail(email: string): Promise<Invitation> {
        try {
            return await this.invitationRepository.findOne({ where: { email }, relations: ['organization'] });
        } catch (error) {
            throw new HttpException('Failed to retrieve invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async reject(id: number): Promise<Invitation> {
        try {
            const invitation = await this.findOne(id);
            await this.invitationRepository.delete(id);
            return invitation;
        } catch (error) {
            this.logger.error('Failed to reject invitation: ', error.message);
            throw new HttpException('Failed to reject invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async accept(id: number): Promise<Invitation> {
        try {
            const invitation = await this.findOne(id);
            const user = await this.userService.getUserByEmail(invitation.email);
            this.logger.log('User: ', user);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const organization = await this.organizationService.getOrganizationById(invitation.organization.organizationId);
            if (!organization) {
                throw new NotFoundException('Organization not found');
            }

            const userDTO = {
                ...user,
                organization: organization.organizationId,
                projects: [],
            };
            await this.userService.updateUser(user.userId, userDTO);
            await this.invitationRepository.delete(id);
            return invitation;
        } catch (error) {
            this.logger.error('Failed to accept invitation: ', error.message);
            throw new HttpException('Failed to accept invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async findAll(): Promise<Invitation[]> {
        try {
            return await this.invitationRepository.find({ relations: ['users', 'organization'] });
        } catch (error) {
            throw new HttpException('Failed to retrieve invitations: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: number): Promise<Invitation> {
        try {
            const invitation = await this.invitationRepository.findOne({
                where: { invitationId: id },
                relations: ['organization'],
            });
            if (!invitation) {
                throw new NotFoundException(`Invitation with ID ${id} not found`);
            }
            return invitation;
        } catch (error) {
            throw new HttpException('Failed to retrieve invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateInvitationDto: InvitationDto): Promise<Invitation> {
        try {
            const invitation = await this.findOne(id);
            const organization = await this.organizationService.getOrganizationById(updateInvitationDto.organization);
            if (!organization) {
                throw new NotFoundException('Organization not found');
            }

            const user = await this.userService.getUserByEmail(updateInvitationDto.email);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const updatedInvitation = {
                ...invitation,
                ...updateInvitationDto,
                organization,
            };

            await this.invitationRepository.update(id, updatedInvitation);
            return this.findOne(id); // Returns the updated invitation
        } catch (error) {
            throw new HttpException('Failed to update invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const invitation = await this.findOne(id); // Verify invitation exists before deleting
            if (!invitation) {
                throw new NotFoundException(`Invitation with ID ${id} not found`);
            }
            await this.invitationRepository.delete(id);
        } catch (error) {
            throw new HttpException('Failed to delete invitation: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
