import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GoogleCalendarService {
    private calendar;

    constructor() {
        this.calendar = google.calendar({ version: 'v3', auth: this.createAuthClient() });
    }

    // Autenticación con Google API
    private createAuthClient() {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI,
        );
        
        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });
        
        return oauth2Client;
    }

    // Crear un evento en Google Calendar
    async createMeetingEvent(meetingDetails: any) {
        const event = {
            summary: meetingDetails.title,
            location: meetingDetails.location,
            description: meetingDetails.description,
            start: {
                dateTime: meetingDetails.startDateTime,
                timeZone: meetingDetails.timeZone,
            },
            end: {
                dateTime: meetingDetails.endDateTime,
                timeZone: meetingDetails.timeZone,
            },
            attendees: meetingDetails.attendees?.map((email: string) => ({ email })),
        };

        try {
            const response = await this.calendar.events.insert({
                calendarId: 'primary',  // 'primary' es el ID del calendario principal del usuario
                requestBody: event,
            });
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw new Error('Failed to create Google Calendar event');
        }
    }
}
