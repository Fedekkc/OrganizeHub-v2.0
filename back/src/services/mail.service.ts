import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CustomMailerService {
  constructor(private readonly mailerService: MailerService) { }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text,
      });
    }
    catch (error) {
      throw new HttpException('Failed to send email: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async sendInvitationEmail(to: string, url: string) {
    try {

      const msg = "You have been invited to join an organization. Click on the following link to accept the invitation: " + url;


      await this.mailerService.sendMail({
        to,
        subject: '[Invitation] OHub',
        text: msg,
      });

    }
    catch (error) {
      throw new HttpException('Failed to send invitation email: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async sendWelcomeEmail(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to our service',
      context: { 
        name,
      },
    });
  }
}