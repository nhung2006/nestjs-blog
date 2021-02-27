import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import path = require('path');
import { diskStorage } from  'multer';
// import { UserRepository } from './user.repository';

@Module({
  imports:[
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret:'topSecret51',
      signOptions:{
        // cho phep luu trong 1h
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([AdminRepository]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads/images',
      }),
    })    
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports:[
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
