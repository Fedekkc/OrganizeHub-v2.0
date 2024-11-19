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