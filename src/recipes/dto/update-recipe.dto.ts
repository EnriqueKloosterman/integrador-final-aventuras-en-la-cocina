import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
    @IsString()
    title?: string;

    @IsArray()
    // @Transform(({ value }) => value.split('//'))
    description?: string;

    @IsArray()
    // @Transform(({ value }) => value.split('//'))
    instructions?: string;

    @IsArray()
    // @Transform(({ value }) => value.split('//'))
    ingredients?: string;

    @IsString()
    image?: string;
    
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    categoryId?: number;

    @IsString()
    userId?: string;
}
