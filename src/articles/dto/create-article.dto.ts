import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsNotEmpty()
    @Transform(({value}) => value.split('//'))
    article: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({value}) => parseInt(value))
    tagId: number

    @IsString()
    userId: string;
}
