import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { DatabaseModule } from './db/database.module';
import { TaskModule } from './modules/task.module';
import { ProjectModule } from './modules/project.module';
import { OrganizationModule } from './modules/organization.module';
@Module({
  imports: [ DatabaseModule, UserModule, TaskModule, ProjectModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
