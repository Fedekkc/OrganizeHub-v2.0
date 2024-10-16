import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { DatabaseModule } from './db/database.module';
import { TaskModule } from './modules/task.module';
import { ProjectModule } from './modules/project.module';
import { OrganizationModule } from './modules/organization.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
@Module({
  imports: [ DatabaseModule, UserModule, TaskModule, ProjectModule, OrganizationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
    }
  ),
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
