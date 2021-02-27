import { Module } from '@nestjs/common';
import { BlogsService } from './blogs/blogs.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot(typeOrmConfig),
    BlogsModule,
    AuthModule,
    CommentModule,
  ],
  
  // providers: [CommentService],
  // providers: [BlogsService],
  // controllers: [BlogsController],
})
export class AppModule {}
