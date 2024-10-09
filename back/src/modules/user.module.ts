import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../guards/jwt.strategy';
@Module({
    imports: [PassportModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
        secret: 'secret', 
        signOptions: { expiresIn: '9h' }
    })],
    providers: [UserService, JwtStrategy],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}