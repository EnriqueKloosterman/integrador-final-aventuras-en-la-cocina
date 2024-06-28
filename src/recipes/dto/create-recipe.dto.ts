import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @Transform(({ value }) => value.join('//'))
    description: string;

    @IsArray()
    @IsNotEmpty()
    @Transform(({ value }) => value.join('//'))
    instructions: string;

    @IsArray()
    @IsNotEmpty()
    @Transform(({ value }) => value.join('//'))
    ingredients: string;

    @IsString()
    @IsNotEmpty()
    image: string;
    
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    categoryId: number;

    @IsString()
    userId: string;
}
