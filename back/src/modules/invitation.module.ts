import { Module } from '@nestjs/common';
import { InvitationService } from '../services/invitation.service';
import { InvitationController } from '../controllers/invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from '../modules/organization.module';
import { UserModule } from '../modules/user.module';
import { Invitation } from '../entities/invitation.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Invitation]),
        OrganizationModule,
        UserModule
    ],
    providers: [InvitationService],
    controllers: [InvitationController],
    exports: [InvitationService],
})
export class InvitationModule {}