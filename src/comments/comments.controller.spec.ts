import { Controller, Post, Param, Body, Get, Delete, Put, BadRequestException, NotFoundException, HttpStatus, Res } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { Response } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('article/:id')
  async createCommentForArticle(@Param('id') articleId: string, @Body() createCommentDto: CreateCommentDto, @Body('user') user: any, @Res() res: Response): Promise<Response> {
    try {
      const newComment = await this.commentsService.create(createCommentDto, user, 'article', articleId);
      return res.status(HttpStatus.CREATED).json(newComment);
    } catch (error) {
      throw new BadRequestException('User and comment data required');
    }
  }

  @Post('recipe/:id')
  async createCommentForRecipe(@Param('id') recipeId: string, @Body() createCommentDto: CreateCommentDto, @Body('user') user: any, @Res() res: Response): Promise<Response> {
    try {
      const newComment = await this.commentsService.create(createCommentDto, user, 'recipe', recipeId);
      return res.status(HttpStatus.CREATED).json(newComment);
    } catch (error) {
      throw new BadRequestException('User and comment data required');
    }
  }

  @Get('article/:id')
  async findAllCommentsByArticle(@Param('id') articleId: string, @Res() res: Response): Promise<Response> {
    try {
      const comments = await this.commentsService.findAllCommentsByArticle(articleId);
      return res.status(HttpStatus.OK).json(comments);
    } catch (error) {
      throw new NotFoundException('Article not found');
    }
  }

  @Get('recipe/:id')
  async findAllCommentsByRecipe(@Param('id') recipeId: string, @Res() res: Response): Promise<Response> {
    try {
      const comments = await this.commentsService.findAllCommentsByRecipe(recipeId);
      return res.status(HttpStatus.OK).json(comments);
    } catch (error) {
      throw new NotFoundException('Recipe not found');
    }
  }

  @Get(':id')
  async findOne(@Param('id') commentId: string, @Res() res: Response): Promise<Response> {
    try {
      const comment = await this.commentsService.findOne(commentId);
      return res.status(HttpStatus.OK).json(comment);
    } catch (error) {
      throw new NotFoundException('Comment not found');
    }
  }

  @Put(':id')
  async update(@Param('id') commentId: string, @Body() updateCommentDto: UpdateCommentDto, @Res() res: Response): Promise<Response> {
    try {
      const updatedComment = await this.commentsService.update(commentId, updateCommentDto);
      return res.status(HttpStatus.OK).json(updatedComment);
    } catch (error) {
      throw new NotFoundException('Comment not found');
    }
  }

  @Delete(':id')
  async remove(@Param('id') commentId: string, @Res() res: Response): Promise<Response> {
    try {
      await this.commentsService.remove(commentId);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new NotFoundException('Comment not found');
    }
  }
}


