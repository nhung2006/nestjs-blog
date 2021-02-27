import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [BlogsController],
    providers: [BlogsService],
    imports:[
        TypeOrmModule.forFeature([BlogRepository]),
        AuthModule,    
    ]
})
export class BlogsModule {
   
}