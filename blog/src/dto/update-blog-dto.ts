import { IsNotEmpty, IsOptional } from "class-validator";

export class GetBlogDto{
    @IsOptional()
    @IsNotEmpty()
    title: string;
}