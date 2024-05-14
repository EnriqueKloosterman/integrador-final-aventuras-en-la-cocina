import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    @IsString()
    userName?: string;

    @IsString()
    userLastName?: string;

    @IsEmail()
    userEmail?: string;

}
