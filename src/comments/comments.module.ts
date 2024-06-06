import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { Comment } from './entities/comment.entity';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Recipe, Article])
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
