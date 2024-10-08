import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDTO } from "../dtos/user.dto";
import { Injectable, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { compare } from "bcrypt";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService
        
    ) {}


    async getUsersByIds(userIds: number[]): Promise<User[]> {
        const users = [];
        for (const userId of userIds) {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }
            users.push(user);
        }
        return users;
    }

    async createJwtPayload(user: User) {
        return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            token: this.jwtService.sign({ userId: user.userId }) 
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new HttpException('Failed to get users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserById(userId: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException('Failed to get user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(userDTO: UserDTO): Promise<User> {
        try {
            const user = new User();
            user.firstName = userDTO.firstName;
            user.lastName = userDTO.lastName;
            user.username = userDTO.username;
            user.email = userDTO.email;
            user.password = await hash(userDTO.password, 10);
            return await this.userRepository.save(user); 
        } catch (error) {
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException('Failed to get user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // return un token de jwt
    async login(email: string, password: string): Promise<any> { 
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            if (await compare(password, user.password)) {
                return this.createJwtPayload(user);
            } else {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            throw new HttpException('Failed to login', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async findByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { email: email } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException('Failed to get user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    

    async updateUser(userId: number, userDTO: UserDTO): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            user.firstName = userDTO.firstName;
            user.lastName = userDTO.lastName;
            user.username = userDTO.username;
            user.email = userDTO.email;
            user.password = await hash(userDTO.password, 10);
            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(userId: number): Promise<boolean> {
        try {
            const result = await this.userRepository.delete(userId);
            if (result.affected === 0) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return true;
        } catch (error) {
            throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
            return false;
        }
    }
}