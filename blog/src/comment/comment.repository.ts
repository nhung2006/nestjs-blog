import { NotFoundException } from "@nestjs/common";
import { Admin } from "src/auth/admin.entity";
import { Blog } from "src/blogs/blog.entity";
import { CreateCommentDto } from "src/dto/comment.dto";
import { GetBlogDto } from "src/dto/get-blog-filter";
import { EntityRepository, Repository } from "typeorm";
import { Comment } from "./comment.entity";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{
    async createComment(
        createCommentDto: CreateCommentDto,
        admin: Admin,      
        ): Promise<Comment>{
        const {content, blogId} = createCommentDto;
        const comment = new Comment();
        comment.content = content;
        comment.blog = blogId;
        comment.admin = admin;
        await comment.save();
        delete comment.admin;
        return comment;
    }

    async getCommentByIdBlog(
        id: number
        ):Promise<Comment[]>{
        const query = this.createQueryBuilder('comment');
        query.where('comment.blogId = :blogId', {blogId: id})
        const blogs = query.getMany();
        return blogs;
    }
}