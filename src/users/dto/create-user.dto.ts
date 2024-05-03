import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    userName: string;

    @IsString()
    userLastName: string;

    @IsEmail()
    userEmail: string;

    @IsString()
    userPassword: string;

    @IsString()
    image:  string;
}
