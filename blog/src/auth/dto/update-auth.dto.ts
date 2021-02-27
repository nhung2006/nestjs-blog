import { IsEmpty } from "class-validator";

export class UpdateAuthDto {

    telephone: number;
    @IsEmpty()
    image: string;
  }