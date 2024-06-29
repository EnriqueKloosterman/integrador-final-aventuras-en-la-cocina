import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsString({ each: true })
    description: string[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    instructions: string[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    ingredients: string[];

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
