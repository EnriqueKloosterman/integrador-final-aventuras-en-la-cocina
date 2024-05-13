import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @IsString()
    title?: string;

    @IsArray()
    @Transform(({value}) => value.split('//'))
    article?: string;

    @IsString()
    image?: string;

    @IsNumber()
    @Transform(({value}) => parseInt(value))
    tagId?: number
}
