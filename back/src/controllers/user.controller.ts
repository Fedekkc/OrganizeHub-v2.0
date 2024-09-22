import { Controller, Get, Post, Put, Delete, Body, SetMetadata } from "@nestjs/common";
import { UserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { PartialType } from "@nestjs/swagger";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    
    @SetMetadata('isPublic', false)
    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    @SetMetadata('isPublic', false)    
    @Get(':userId')
    async getUserById(userId: number): Promise<User> {
        return await this.userService.getUserById(userId);
    }

    @SetMetadata('isPublic', false)
    @Post()
    async createUser(@Body() userDTO: UserDTO): Promise<User> {
        return await this.userService.createUser(userDTO);
    }

    @SetMetadata('isPublic', false)
    @Put(':userId')
    async updateUser(userId: number, @Body() userDTO: UserDTO): Promise<User> {
        return await this.userService.updateUser(userId, userDTO);
    }

    @Delete(':userId')
    async deleteUser(userId: number): Promise<void> {
        return await this.userService.deleteUser(userId);
    }


}