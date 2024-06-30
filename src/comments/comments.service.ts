import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Article } from '../articles/entities/article.entity';
import { Recipe } from '../recipes/entities/recipe.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private comentRepository: Repository<Comment>,
    @InjectRepository (User)
    private userRepositry: Repository<User>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>
  ){}

  async create(createCommentDto: CreateCommentDto, user: any, articleId?: string, recipeId?: string) {
    const { comment } = createCommentDto;

    if (!recipeId && !articleId) {
        throw new BadRequestException('Article or Recipe is required');
    }

    const newComment = new Comment();
    newComment.comment = comment;
    newComment.user = user;

    if (recipeId) {
        const recipe = await this.recipeRepository.findOne({ where: { recipeId } });
        if (!recipe) {
            throw new BadRequestException('Recipe not found');
        }
        newComment.recipe = recipe;
    }

    if (articleId) {
        const article = await this.articleRepository.findOne({ where: { articleId } });
        if (!article) {
            throw new BadRequestException('Article not found');
        }
        newComment.article = article;
    }

    try {
        await this.comentRepository.save(newComment);
    } catch (error) {
        throw new BadRequestException(error.message, 'Comment creation failed');
    }
    
    return newComment;
}


  async findAllCommentsByArticle(articleId: string) {
    const article =  await this.articleRepository.findOne({
      where: { articleId: articleId }
    });
    if(!article) throw new BadRequestException('Article not found');

    const comments = await this.comentRepository.find({
      where: {
        article: {
          articleId: article.articleId
        }
      },
      relations: ['user']
    });
    
    const commentsByArticle = comments.map(comment => ({
      commentId: comment.commentId,
      comment: comment.comment,
      user: {
        name: comment.user.userName,
        lastName: comment.user.userLastName,
        userEmail: comment.user.userEmail,
        image: comment.user.image
      }
    }));
    return commentsByArticle;
  }

  async findAllCommentsByRecipe(recipeId: string) {
  const recipe = await this.recipeRepository.find({
    where: {
      recipeId: recipeId
    }
  });
  if(!recipe) throw new BadRequestException('Recipe not found');

  const comments = await this. comentRepository.find({
    where: {
      recipe: { recipeId }
    },
    relations: ['user']
  });

  const commentsByRecipe = comments.map(comment => ({
    commentId: comment.commentId,
    comment: comment.comment,
    user: {
      name: comment.user.userName,
      lastName: comment.user.userLastName,
      userEmail: comment.user.userEmail,
      image: comment.user.image
    }
  }));
  return commentsByRecipe;
}
  async findOne(id: number): Promise<Comment> {
    const comment = await this.comentRepository.findOne({
      where: {
        commentId: id
      },
      relations: ['user', 'article', 'recipe']
    })
    try {
      if(!comment) throw new BadRequestException('Comment not found');
      return comment;
    } catch (error) {
      throw new BadRequestException(error.message, 'Comment not found');
    }
  } 

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number): Promise<void> {
    const comment = await this.comentRepository.findOne({
      where: {
        commentId: id
      }
    });
    try {
      if(!comment) throw new BadRequestException('Comment not found');
      await this.comentRepository.remove(comment)
    } catch (error) {
      throw new Error(error.message);
    }
  }
}