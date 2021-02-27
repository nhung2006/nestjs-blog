import { type } from "os";
import { Admin } from "src/auth/admin.entity";
import {Comment} from "src/comment/comment.entity"
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { from } from "rxjs";

@Entity()
export class Blog extends BaseEntity{
        @PrimaryGeneratedColumn() 
        id: number;
      
        @Column()
        title: string;
    
        @Column()
        content: string;

    //   @Column()
    //   user_id: string;

        @Column()
        like: string;

        @ManyToOne(type=> Admin, admin => admin.blog,{ eager: false})
        admin: Admin;


        @OneToMany(type=> Comment, comment => comment.blog,{ eager: true})
        comment: Comment[];
        adminId: number;
  }