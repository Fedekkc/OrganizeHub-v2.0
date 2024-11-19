import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { DatabaseModule } from './db/database.module';
import { TaskModule } from './modules/task.module';
import { ProjectModule } from './modules/project.module';
import { OrganizationModule } from './modules/organization.module';
import { PermissionModule } from './modules/permission.module';
import { RoleModule } from './modules/role.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { TeamModule } from './modules/team.module';
import { MeetingModule } from './modules/meeting.module';
import { InvitationModule } from './modules/invitation.module';
import { MailerCustomModule } from './modules/mailer.module'; // Ajusta la ruta según tu estructura de directorios

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TaskModule,
    ProjectModule,
    OrganizationModule,
    PermissionModule,
    RoleModule,
    TeamModule,
    MeetingModule,
    InvitationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
    }),
    MailerCustomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}