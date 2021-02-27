import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToOne} from 'typeorm';
import * as bcrypt from 'bcrypt'
import { Blog } from 'src/blogs/blog.entity';
import { type } from 'os';
import { Comment } from 'src/comment/comment.entity';
@Entity()
@Unique(['username'])
export class Admin extends BaseEntity{
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({nullable: true})
    telephone: number;

    @Column({nullable: true})
    salt: string;

    @Column({nullable: true})
    image: string;

    @OneToMany(type => Blog, blog => blog.admin, {eager: true})
    blog: Blog[];

    @OneToMany(type => Comment, comment =>comment.admin, {eager: true})
    comment: Comment[];

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt )
        return hash === this.password;
    }

    @Column({nullable: true})
    role: number;
}