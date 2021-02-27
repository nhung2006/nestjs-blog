import { IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message: 'mat khau yeu'}
    )
    password: string;
    
    @IsInt()
    role: number
}