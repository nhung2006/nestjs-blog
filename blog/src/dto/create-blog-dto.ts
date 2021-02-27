import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBlogDto{

    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    like: string;
}