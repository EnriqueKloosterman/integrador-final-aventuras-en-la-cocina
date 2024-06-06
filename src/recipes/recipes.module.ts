import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Category } from '../categories/entities/category.entity';
import { Comment } from '../comments/entities/comment.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Category, Comment, User])
  ],
  exports: [RecipesService],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
