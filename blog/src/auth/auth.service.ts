
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
// import { UserRepository } from './user.repository';
import {InjectRepository} from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import{ UpdateAuthDto } from './dto/update-auth.dto'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Admin } from './admin.entity';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository,
        // @InjectRepository(UserRepository)
        // private userRepository: UserRepository,
        private jwtService: JwtService
    ){

    }


    async singUp(authDto: AuthDto): Promise<void>{
        return this.adminRepository.signUp(authDto);
    }
    
    async singIn(authDto: AuthDto){
        const username = await this.adminRepository.validate(authDto)
        if(!username){
            throw new UnauthorizedException('User does not exits');
        }
        const payload: JwtPayload= {username};
        const accessToken = await this.jwtService.sign(payload)

        return{ accessToken};
    }

    async getInfo(       
        admin: Admin
    ):Promise<Admin>{
        const user = await this.adminRepository.createQueryBuilder('admin')
        .select(["admin.username", "admin.telephone", "admin.image"])
        .where("admin.id = :adminId", {adminId: admin.id})
        .getOne();     
        return user;
    }

    async getInfoFriend(       
        id: number
    ):Promise<Admin>{
        const user = await this.adminRepository.findOne(id);
        if(!user){
            throw new NotFoundException(`id '${id}' not found`);
        }
        return user;
    }

    async updateInfo(
        admin: Admin,
        // telephone: number
        updateAuthDto: UpdateAuthDto
    ): Promise<Admin>{
        const user = await this.adminRepository.createQueryBuilder('admin').select(["admin.username", "admin.telephone", "admin.image"]).where("admin.id = :adminId", {adminId: admin.id}).getOne();
        user.telephone = updateAuthDto.telephone
        user.save()
        return user;
    }
    
    async uploadImg(
        admin: Admin,
        image: string
    ): Promise<Admin>{
        const user = await this.adminRepository.createQueryBuilder('admin').getOne()
        user.image = image
        
        user.save()
        return user;
        
    }

    // async getInfo(
    //     authDto: AuthDto,
    //     admin: Admin
    // ):Promise<Admin[]>{
    //     const user = await this.adminRepository.getInfoOfUser(authDto, admin);
    //     return user;
    // }
    // async logOut(token: string): Promise<void>{
        
    // }
    // async getInfo(       
    //     authDto: AuthDto
    // ):Promise<AuthDto>{
    //     const user = await this.adminRepository.getInfoOfUser(authDto)
    //     return user;
    // }
    // async getInfoOfUser(
    //     admin: Admin
    //     ):Promise<Admin>{
    //     const query = await this.createQueryBuilder('admin').select(["admin.username", "admin.telephone"]).getOne()
    //     return query;
    // }
    // }
    // async singUp(userDto: UserDto): Promise<void>{
    //     return this.userRepository.signUp(userDto);
    // }
    // async singIn(userDto: UserDto){
    //     const username = await this.userRepository.validate(userDto)
    //     if(!username){
    //         throw new UnauthorizedException('khong ton tai');
    //     }
    //     const payload: JwtPayload= {username};
    //     const accessToken = await this.jwtService.sign(payload)

    //     return{ accessToken};
    // }
}
