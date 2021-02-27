import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/auth/admin.entity';
import { CreateBlogDto } from 'src/dto/create-blog-dto';
import { GetBlogDto } from 'src/dto/get-blog-filter';
import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(BlogRepository)
        private blogRepository: BlogRepository,
    ){

    }
    async getBlog(
        getBlog: GetBlogDto,
        admin: Admin
        ):Promise<Blog[]>{
        return this.blogRepository.getBlog(getBlog, admin);
    }

    async getMyBlog(
        admin: Admin
        ):Promise<Blog[]>{
        const user = await this.blogRepository.getMyBlog( admin);
        return user;
    }

    async getBlogById(id: number):  Promise<Blog>{
        const found = await this.blogRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`id '${id}' not found`);
        }
        return found;
    }

    async createBlog(
        createBlog: CreateBlogDto,
        admin: Admin, 
        ):  Promise<Blog>{
        return this.blogRepository.createBlog(createBlog, admin)
    }

    async updateBlog(id: number, content: string): Promise<Blog>{
        const blog = await this.getBlogById(id);
        blog.content = content;
        blog.save();
        return blog;
    }

    async deleteBlog(id: number): Promise<void>{
        const found = this.blogRepository.delete(id);
        if((await found).affected === 0){
            throw new NotFoundException(`id '${id}' not found`);
        }
    }
    
}
