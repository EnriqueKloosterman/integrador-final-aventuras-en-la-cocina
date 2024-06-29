import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
    @IsString()
    title?: string;

    @IsArray()
    description?: string[];

    @IsArray()
    instructions?: string[];

    @IsArray()
    ingredients?: string[];

    @IsString()
    image?: string;
    
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    categoryId?: number;

    @IsString()
    userId?: string;
}
