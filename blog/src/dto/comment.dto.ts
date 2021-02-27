import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCommentDto{

    @IsOptional()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    blogId: number;
     

}