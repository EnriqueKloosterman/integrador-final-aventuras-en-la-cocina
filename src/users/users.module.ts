import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { Article } from '../articles/entities/article.entity';
import { Comment } from '../comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Comment, Recipe, Article])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
