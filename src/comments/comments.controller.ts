import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '../common/decorators/active.user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @Post('article/comment/:articleId')
  @Auth(Role.USER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createComentForArticle(@Param('articleId', new ParseUUIDPipe()) articleId: string, @Body() createCommentDto: CreateCommentDto, @ActiveUser() user: any){
    if(!createCommentDto || !user){
      throw new HttpException('User and commnet data required', HttpStatus.BAD_REQUEST)
    }
    try {
      const newComment = await this.commentsService.create( createCommentDto, user, articleId);
      return newComment
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @ApiBearerAuth()
  @Post('recipe/comment/:recipeId')
  @Auth(Role.USER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createComentForRecipe(@Param('recipeId', new ParseUUIDPipe()) recipeId: string, @Body() createCommentDto: CreateCommentDto, @ActiveUser() user: any){
    if(!createCommentDto || !user){
      throw new HttpException('User and commnet data required', HttpStatus.BAD_REQUEST)
    }
    try {
      const newComment = await this.commentsService.create(createCommentDto, user, undefined, recipeId);
      return newComment 
    } catch (error) {
      console.log(error);
      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('article/:articleId')
  async findAllCommentsByArtcicle(@Param('articleId') articleId: string) {
    return await this.commentsService.findAllCommentsByArticle(articleId);
  }
  @Get('recipe/:recipeId')
  async findAllCommentsByRecipe(@Param('recipeId') recipeId: string) {
    return await this.commentsService.findAllCommentsByRecipe(recipeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }
  @ApiBearerAuth()
  @Delete('remove/:id')
  @Auth(Role.USER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const comment = await this.commentsService.findOne(+id);
      if(!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
      await this.commentsService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
