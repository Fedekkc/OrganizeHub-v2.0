import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../guards/jwt.strategy';
import { OrganizationModule } from './organization.module';
import { MailerCustomModule } from './mailer.module';
@Module({
    imports: [PassportModule,
        forwardRef(() => OrganizationModule),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
        secret: 'secret', 
        signOptions: { expiresIn: '9h' }
    }),
    MailerCustomModule
],
    providers: [UserService, JwtStrategy],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}