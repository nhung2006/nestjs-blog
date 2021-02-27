import { Admin } from "src/auth/admin.entity";
import { CreateBlogDto } from "src/dto/create-blog-dto";
import { GetBlogDto } from "src/dto/get-blog-filter";
import { EntityRepository, Repository } from "typeorm";
import { Blog } from "./blog.entity";
import {Comment} from "src/comment/comment.entity"

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog>{
    async getBlog(
        filterDto: GetBlogDto,
        admin: Admin,       
        ):Promise<Blog[]>{
        const { search} = filterDto;
        const query = this.createQueryBuilder('blog');
        query
        .innerJoin('blog.admin', 'admin')
        .innerJoin('blog.comment', 'comment')
        .select('blog')
        .addSelect('admin.username')
        .addSelect('comment.content')
        
        if(search){
            query.andWhere('blog.title like :search AND blog.content like :search', {search: `%${search}%`}); 
        }
        const blogs = query.getMany();
        return blogs;
    }
    async getMyBlog(
        admin: Admin
        ):Promise<Blog[]>{
        const query = this.createQueryBuilder('blog');
        query.where('blog.adminId = :adminId', {adminId: admin.id})        
        const blogs = query.getMany();
        return blogs;
    }

    async createBlog(
        createBlogDto: CreateBlogDto,
        admin: Admin
        ): Promise<Blog>{
        const {title, content, like} = createBlogDto;
        const blog = new Blog();
        blog.title = title;
        blog.content = content;
        blog.like = like;
        blog.admin = admin;
        await blog.save();
        delete blog.admin;
        return blog;

    } 
}