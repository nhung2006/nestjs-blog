import { Controller, Get,Query,ValidationPipe  , Post, UsePipes, Body, ParseIntPipe, Param, Patch, Delete, UseGuards, UseInterceptors, UploadedFile} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from 'src/auth/admin.entity';
import { GetUser } from 'src/auth/get-admin.decoator';
import { CreateBlogDto } from 'src/dto/create-blog-dto';
import { GetBlogDto } from 'src/dto/get-blog-filter';
import { Blog } from './blog.entity';
import {Comment} from "src/comment/comment.entity"
import { BlogsService } from './blogs.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blogs')
@UseGuards(AuthGuard())
export class BlogsController {
    constructor(private blogService: BlogsService){

    }
    @Get()
    getBlog(
        @Query(ValidationPipe) filterDto: GetBlogDto,
        @GetUser() admin: Admin
        ): Promise<Blog[]>{
        return this.blogService.getBlog(filterDto, admin);
    }


    @Get('/myblog')
    getMyBlog(
        @Query(ValidationPipe) filterDto: GetBlogDto,
        @GetUser() admin: Admin
        ): Promise<Blog[]>{
        return this.blogService.getMyBlog(admin);
    }

    @Get('/:id')
    getBlogById(@Param('id', ParseIntPipe) id: number): Promise<Blog>{
        return this.blogService.getBlogById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
        createBlog(
        @Body() createTaskDto:CreateBlogDto,
        @GetUser() admin: Admin
        ):Promise<Blog>{
            return this.blogService.createBlog(createTaskDto, admin)
    }

    @Patch('/:id')
    updateBlog(
        @Param('id', ParseIntPipe) id: number,
        @Body('content', ValidationPipe) content:  string, 
    ): Promise<Blog>{
        return this.blogService.updateBlog(id, content);
    }

    @Delete('/:id')
    deleteBlog(@Param('id', ParseIntPipe)id: number):Promise<void>{
        return this.blogService.deleteBlog(id)
    }

}
