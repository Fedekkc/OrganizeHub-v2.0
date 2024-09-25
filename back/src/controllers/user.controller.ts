import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, SetMetadata } from "@nestjs/common";
import { UserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { EntityNotFoundError } from "typeorm";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @SetMetadata('isPublic', false)
    @Get()
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

    @SetMetadata('isPublic', false)
    @Get(':userId')
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
    async login(@Body() body: { email: string, password: string } ): Promise<{ token: string }> {
        try {
            return this.userService.login(body.email, body.password);

        } catch (error) {
            throw new HttpException('Failed to login', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @SetMetadata('isPublic', false)
    @Post()
    async createUser(@Body() userDTO: UserDTO): Promise<{ token: string }> {
        try {
            const newUser = await this.userService.createUser(userDTO);
            const jwtPayload = await this.userService.createJwtPayload(newUser);
            return { token: jwtPayload.token };  // Retorna el token JWT
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @SetMetadata('isPublic', false)
    @Put(':userId')
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