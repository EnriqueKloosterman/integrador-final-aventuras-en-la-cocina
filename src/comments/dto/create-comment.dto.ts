import { IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    comment: string;

    @IsString()
    @IsOptional()
    articleId?: string;  

    @IsString()
    @IsOptional()
    recipeId?: string;  
}
