import { type } from "os";
import { Admin } from "src/auth/admin.entity";
import { Blog } from "src/blogs/blog.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(type=> Blog, blog => blog.comment,{ eager: false})
    blog: number;

    @ManyToOne(type => Admin, admin => admin.comment, {eager: false})
    admin: Admin;
}