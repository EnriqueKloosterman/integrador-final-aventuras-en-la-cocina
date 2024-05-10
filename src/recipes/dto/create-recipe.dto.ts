import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsNotEmpty()
    @Transform(({ value }) => value.split('//'))
    recipe: string;

    @IsArray()
    @IsNotEmpty()
    @Transform(({ value }) => value.split('//'))
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
