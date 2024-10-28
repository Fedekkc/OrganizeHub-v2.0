import { Module } from '@nestjs/common';
import { MeetingService } from '../services/meeting.service';
import { MeetingController } from '../controllers/meeting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { forwardRef } from '@nestjs/common';
import { Meeting } from 'src/entities/meeting.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Meeting]), forwardRef(() => UserModule)],
    providers: [MeetingService],
    controllers: [MeetingController],
    exports: [MeetingService]
})
export class MeetingModule {}