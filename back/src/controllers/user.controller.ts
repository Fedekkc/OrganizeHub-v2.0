import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, SetMetadata, UseGuards, Request } from "@nestjs/common";
import { UserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { EntityNotFoundError } from "typeorm";
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Post('validate-token')
    validateToken(@Request() req: any) {

        // decode the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = this.userService.decodeToken(token);
        if (!decoded) {
            throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
        }
        

        return { status: 200, user: req.user };
    }

    @Get()
    @UseGuards(JwtAuthGuard) // Protege esta ruta
    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userService.getAllUsers();
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to get users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':userId')
    @UseGuards(JwtAuthGuard) // Protege esta ruta
    async getUserById(@Param('userId') userId: number): Promise<User> {
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to get user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('login')
    async login(@Body() body: { email: string, password: string }): Promise<{ token: string }> {
        try {
            return await this.userService.login(body.email, body.password);
        } catch (error) {
            throw new HttpException('Failed to login', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createUser(@Body() userDTO: UserDTO): Promise<{ token: string }> {
        try {
            const newUser = await this.userService.createUser(userDTO);
            const jwtPayload = await this.userService.createJwtPayload(newUser);
            return { token: jwtPayload.token }; // Retorna el token JWT
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':userId')
    @UseGuards(JwtAuthGuard) // Protege esta ruta
    async updateUser(@Param('userId') userId: number, @Body() userDTO: UserDTO): Promise<User> {
        try {
            const user = await this.userService.updateUser(userId, userDTO);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':userId')
    @UseGuards(JwtAuthGuard) // Protege esta ruta
    async deleteUser(@Param('userId') userId: number): Promise<void> {
        try {
            const result = await this.userService.deleteUser(userId);
            if (!result) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
