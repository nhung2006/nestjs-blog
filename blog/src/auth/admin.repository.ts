import {  Repository, EntityRepository } from "typeorm";
import { Admin } from "./admin.entity";
import { AuthDto } from "./dto/auth.dto";
import {ConflictException, InternalServerErrorException} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@EntityRepository(Admin)
export class AdminRepository extends  Repository<Admin>{
    async signUp(authDto: AuthDto): Promise<void>{
        const {username, password} = authDto;
        
        const admin = new Admin();
        admin.username = username;
        admin.salt = await bcrypt.genSalt();
        admin.password = await this.hashPassword(password, admin.salt);
        try{
            await admin.save();
        } catch(error){
            if(error.code === "ER_DUP_ENTRY"){
                throw new ConflictException('ten dang nhap da ton tai')
            }else{
                throw new InternalServerErrorException('no');
            }
        }
        
    }

    private async hashPassword(password: string, salt: string){
        return bcrypt.hash(password, salt)

    }
    async validate(authDto:AuthDto): Promise<string>{
        const {username, password} = authDto;
        const admin = await this.findOne({username})

        if (admin && await admin.validatePassword(password) ){
            return(admin.username);
        }
        else{
            return null;
        }
        
    }

    async getInfoOfUser(
        admin: Admin
        ):Promise<Admin>{
        const query = await this.createQueryBuilder('admin').select(["admin.username", "admin.telephone"]).getOne()
        return query;
    }
}