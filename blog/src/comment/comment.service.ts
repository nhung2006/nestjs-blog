import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/auth/admin.entity';
import { Blog } from 'src/blogs/blog.entity';
import { CreateCommentDto } from 'src/dto/comment.dto';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentRepository)
        private commentRepository: CommentRepository,
    ){}

    async createComment(
        createComment: CreateCommentDto,
        admin: Admin,       
        ):  Promise<Comment>{
        return this.commentRepository.createComment(createComment, admin)
    }

    async getCommentByBlog(id: number):  Promise<Comment[]>{
        const found = await this.commentRepository.getCommentByIdBlog(id)
        if(!found){
            throw new NotFoundException(`id '${id}' not found`);
        }
        return found;
    }

    async getCommentById(id: number): Promise<Comment>{
        const found = await this.commentRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`id '${id}' not found`);
        }
        return found;
    }
    async updateComment(id: number, content: string):  Promise<Comment>{
        const comment = await this.getCommentById(id);
        comment.content = content;
        comment.save();
        return comment;
    }

    async deleteComment(id: number): Promise<void>{
        const found = await this.commentRepository.delete(id);
    }
}
