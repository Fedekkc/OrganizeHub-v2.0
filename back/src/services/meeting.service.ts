import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from '../entities/meeting.entity';
import { MeetingDto } from '../dtos/meeting.dto';
import { UserService } from './user.service';
import { Inject, forwardRef } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class MeetingService {
    constructor(
        @InjectRepository(Meeting)
        private meetingRepository: Repository<Meeting>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) {}

    async createMeeting(meetingDto: MeetingDto): Promise<Meeting> {
        try {
            const creator = await this.userService.getUserById(meetingDto.createdBy);
            if (!creator) {
                throw new HttpException('Creator not found', HttpStatus.NOT_FOUND);
            }

            const meeting = this.meetingRepository.create({
                ...meetingDto,
                createdBy: creator, // Asigna el usuario creador
            });
            return await this.meetingRepository.save(meeting);
        } catch (error) {
            throw new HttpException('Failed to create meeting: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllMeetings(): Promise<Meeting[]> {
        return this.meetingRepository.find({ relations: ['assignedTo', 'createdBy'] });
    }

    async getMeetingById(meetingId: number): Promise<Meeting> {
        const meeting = await this.meetingRepository.findOne({ 
            where: { meetingId: meetingId },
            relations: ['assignedTo', 'createdBy'],
        });
        if (!meeting) {
            throw new NotFoundException(`Meeting with ID ${meetingId} not found`);
        }
        return meeting;
    }

    async updateMeeting(meetingId: number, meetingDto: MeetingDto): Promise<Meeting> {
        const meeting = await this.getMeetingById(meetingId); // Verifica si la reunión existe
        const creator = await this.userService.getUserById(meetingDto.createdBy);
        if (!creator) {
            throw new HttpException('Creator not found', HttpStatus.NOT_FOUND);
        }

        const updatedMeeting = {
            ...meeting,
            ...meetingDto,
            createdBy: creator,
        };

        await this.meetingRepository.update(meetingId, updatedMeeting);
        return this.getMeetingById(meetingId); // Devuelve la reunión actualizada
    }

    async deleteMeeting(meetingId: number): Promise<boolean> {
        const result = await this.meetingRepository.delete(meetingId);
        return result.affected > 0; // Devuelve true si se eliminó correctamente
    }

    async addUsersToMeeting(meetingId: number, userIds: number[]): Promise<Meeting> {
        const meeting = await this.getMeetingById(meetingId);
        const users = await this.userService.getUsersByIds(userIds);
        
        if (!meeting) {
            throw new NotFoundException('Meeting not found');
        }

        meeting.assignedTo = [...meeting.assignedTo, ...users];
        return this.meetingRepository.save(meeting);
    }
}
