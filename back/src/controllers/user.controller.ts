import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, SetMetadata, UseGuards, Request, HttpCode, UseInterceptors } from "@nestjs/common";
import { PartialUserDTO, UserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { EntityNotFoundError } from "typeorm";
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Logger } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UploadedFile } from "@nestjs/common";
import { CustomMailerService } from "../services/mail.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService, private mailerService: CustomMailerService) { }

    private readonly logger = new Logger(UserController.name);

    @UseGuards(JwtAuthGuard)
    @Post('validate-token')
    async validateToken(@Request() req: any) {

        // decode the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await this.userService.decodeToken(token);
        this.logger.log(req.user.userId);
        this.mailerService.sendEmail( req.user.email, '¡Bienvenido!', 'Bienvenido a [Org Name]\n\nGracias por registrarte en nuestra plataforma. Esperamos que disfrutes de nuestros servicios.\n\nSaludos cordiales,\n\n[Org Name]'); 
        if (!decoded) {
            throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
        }
        

        return { status: 200, user: req.user };
    }

    //logout
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req: any) {
        // decode the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await this.userService.decodeToken(token);
        this.logger.log(req.user.userId);
        this.userService.logout(req.user.userId);
        if (!decoded) {
            throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
        }
        return { status: 200, message: 'Logout successful' };
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
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    }))
    async createUser(@Body() userDTO: UserDTO, @UploadedFile() file: Express.Multer.File): Promise<{ token: String}> {
        try {
            const newUser = { ...userDTO, avatar: file.filename };
            const user = await this.userService.createUser(newUser);
            const jwtPayload = await this.userService.createJwtPayload(user);

            return {token: jwtPayload.token }

        } catch (error) {
            throw new HttpException('[-] Failed to create user ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
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
    */
    

    @Put(':userId')
    @UseGuards(JwtAuthGuard) // Protege esta ruta
    async updateUser(@Param('userId') userId: number, @Body() userDTO: PartialUserDTO): Promise<User> {
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
