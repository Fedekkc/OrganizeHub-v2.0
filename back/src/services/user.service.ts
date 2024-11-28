import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDTO } from "../dtos/user.dto";
import { PartialUserDTO } from "../dtos/user.dto";
import { Injectable, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { Organization } from "src/entities/organization.entity";
import { Logger } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { ProjectService } from "./project.service";
import { Inject, forwardRef } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private organizationService: OrganizationService,
        @Inject(forwardRef(() => ProjectService)) private projectService: ProjectService,
        private jwtService: JwtService
        
    ) {}

    private readonly logger = new Logger(UserService.name);

    async decodeToken(token: string) {
        const decodedToken = await this.jwtService.decode(token);
        this.logger.log(decodedToken);
        return decodedToken;
    }

    async setUserActive(userId: number, active: boolean): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            user.isActive = active;
            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException('Failed to set user active', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getUsersByOrganization(organization: Organization): Promise<User[]> {
        try {
            const query = this.userRepository.createQueryBuilder('user');
            query.where('user.organization = :organization', { organization: organization.organizationId });
            var users = await query.getMany();
            for (var i = 0; i < users.length; i++) {
                users[i].avatar = `http://localhost:5000/${users[i].avatar}`;
            }
            return users;


        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Failed to get users by organization', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUsersByIds(userIds: number[]): Promise<User[]> {
        try {
            const users = [];
            for (const userId of userIds) {
                const user = await this.userRepository.findOne({ where: { userId } });
                if (!user) {
                    throw new NotFoundException(`User with ID ${userId} not found`);
                }
                users.push(user);
            }
            return users;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createJwtPayload(user: User) {
        return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            organization: user.organization,
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
            const user = await this.userRepository.findOne({ where: { userId }, relations: ['organization'] });
            user.avatar = `http://localhost:5000/${user.avatar}`;
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
            if (await this.userRepository.findOne({ where: { email: userDTO.email } })) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }

            const user = new User();
            user.firstName = userDTO.firstName;
            user.lastName = userDTO.lastName;
            user.username = userDTO.username;
            user.email = userDTO.email;
            user.avatar = userDTO.avatar;
            user.password = await hash(userDTO.password, 10);
            return await this.userRepository.save(user); 
        } catch (error) {
            throw new HttpException('[-] Failed to create user ' + error , HttpStatus.INTERNAL_SERVER_ERROR);
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
            const user = await this.userRepository.findOne({ where: { email }, relations: ['organization'] });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            if (await compare(password, user.password)) {
                this.setUserActive(user.userId, true);
                return this.createJwtPayload(user);
            } else {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            throw new HttpException('Failed to login', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async logout(userId: number): Promise<boolean> {
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            this.setUserActive(userId, false);
            return true;
        } catch (error) {
            throw new HttpException('Failed to logout', HttpStatus.INTERNAL_SERVER_ERROR);
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



    

    async updateUser(userId: number, userDTO: PartialUserDTO): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { userId: userId } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            if (userDTO.firstName) user.firstName = userDTO.firstName;
            if (userDTO.lastName) user.lastName = userDTO.lastName;
            if (userDTO.username) user.username = userDTO.username;
            if (userDTO.email) user.email = userDTO.email;
            if (userDTO.organization) {
                user.organization = await this.organizationService.getOrganizationById(userDTO.organization);
            }
            if (userDTO.password) {
                user.password = await hash(userDTO.password, 10);
            }
            if (userDTO.role) user.role = userDTO.role;

            if (userDTO.projects)
            {
                user.projects = await this.projectService.getProjectsByIds(userDTO.projects);

            }
            
            


            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException('Failed to update user: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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