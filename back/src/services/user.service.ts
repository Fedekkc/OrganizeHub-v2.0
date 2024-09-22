import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDTO } from "../dtos/user.dto";
import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(userId: number): Promise<User> {
        return await this.userRepository.findOne( { where: {userId} } );
    }

    async createUser(userDTO: UserDTO): Promise<User> {
        const user = new User();
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.username = userDTO.username;
        user.email = userDTO.email;
        user.password = await hash(userDTO.password, 10);
        return await this.userRepository.save(user);
    }

    async updateUser(userId: number, userDTO: UserDTO): Promise<User> {
        const user = await this.userRepository.findOne( { where: {userId} } );
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.username = userDTO.username;
        user.email = userDTO.email;
        user.password = await hash(userDTO.password, 10);
        return await this.userRepository.save(user);
    }

    async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId);
    }
}