import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CustomMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }

  async sendInvitationEmail(to: string, url: string) {

    const msg = "You have been invited to join an organization. Click on the following link to accept the invitation: " + url;


    await this.mailerService.sendMail({
      to,
      subject: '[Invitation] OHub',
      text: msg,
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to our service',
      context: { // contenido del mensaje
        name,
      },
    });
  }
}