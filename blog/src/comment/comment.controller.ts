import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCommentDto } from 'src/dto/comment.dto';
import { CommentService } from './comment.service';
import {Comment} from "./comment.entity"
import { Blog } from 'src/blogs/blog.entity';
import { GetUser } from 'src/auth/get-admin.decoator';
import { Admin } from 'src/auth/admin.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
    constructor(private commentService: CommentService){}

    @Post()
    @UsePipes(ValidationPipe)
        createComment(
            @Body() createCommentDto: CreateCommentDto,
            @GetUser() admin: Admin
        ):Promise<Comment>{
            return this.commentService.createComment(createCommentDto, admin)
        }
    @Get('/:id')
    getblog(@Param('id', ParseIntPipe) id: number):Promise<Comment[]>{
        return this.commentService.getCommentByBlog(id);
    }


    @Patch('/:id')
    updateBlog(
        @Param('id', ParseIntPipe) id: number,
        @Body('content', ValidationPipe) content:  string, 
    ): Promise<Comment>{
        return this.commentService.updateComment(id, content);
    }

    @Delete('/:id')
    deleteComment(@Param('id', ParseIntPipe)id: number): Promise<void>{
        return this.commentService.deleteComment(id);
    }
}
