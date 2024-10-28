import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MeetingService } from '../services/meeting.service';
import { MeetingDto } from '../dtos/meeting.dto';
import { Meeting } from '../entities/meeting.entity';
@Controller('meetings')
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) {}

    @Post()
    async createMeeting(@Body() meetingDto: MeetingDto): Promise<Meeting> {
        return this.meetingService.createMeeting(meetingDto);
    }

    @Get()
    async getAllMeetings(): Promise<Meeting[]> {
        return this.meetingService.getAllMeetings();
    }

    @Get(':id')
    async getMeetingById(@Param('id') id: number): Promise<Meeting> {
        return this.meetingService.getMeetingById(id);
    }

    @Put(':id')
    async updateMeeting(@Param('id') id: number, @Body() meetingDto: MeetingDto): Promise<Meeting> {
        return this.meetingService.updateMeeting(id, meetingDto);
    }

    @Delete(':id')
    async deleteMeeting(@Param('id') id: number): Promise<boolean> {
        return this.meetingService.deleteMeeting(id);
    }

    @Post(':id/users')
    async addUsersToMeeting(@Param('id') id: number, @Body('userIds') userIds: number[]): Promise<Meeting> {
        return this.meetingService.addUsersToMeeting(id, userIds);
    }
}
