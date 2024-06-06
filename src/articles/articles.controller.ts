import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from '../constants/file-upload.validator';
import { CONSTANTS } from '../constants/constants';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active.user.decorator';
import { Article } from './entities/article.entity';
import { IUserActive } from '../common/inteface/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @Post('register')
  @Auth(Role.USER)
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomUploadFileTypeValidator({
            fileType: CONSTANTS.valid_mime_types,
          }),
        )
        .addMaxSizeValidator({ maxSize: CONSTANTS.max_bytes_pic_size })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image: Express.Multer.File,
    @Body() createArticleDto: CreateArticleDto,
    @ActiveUser() user: any,
  ): Promise<string> {
    if (!image || !createArticleDto) {
      throw new HttpException(
        'Image and data required',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const response: CloudinaryResponse =
        await this.articlesService.handleUpload(image, createArticleDto, user);
      return response.url;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('articles')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll() {
    try {
      const articles = await this.articlesService.findAll();
      if (articles.length) {
        return articles;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @ApiBearerAuth()
  @Get('articles/user')
  @Auth(Role.USER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getArticlesByUser(@ActiveUser() user: IUserActive): Promise<Article[]> {
    try {
      return await this.articlesService.findAllUserArticles(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('article/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: string): Promise<Article> {
    try {
      const article = await this.articlesService.findOne(id);
      if (!article)
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      return article;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //TODO: testear el update
  @ApiBearerAuth()
  @Patch('update/article/:id')
  @Auth(Role.USER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto | string,
    @ActiveUser() user: IUserActive,
  ): Promise<Article> {
    try {
      if (typeof updateArticleDto === 'string') {
        updateArticleDto = { article: updateArticleDto };
      }
      const article = await this.articlesService.update(
        id,
        user,
        updateArticleDto,
      );
      return article;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @Delete('remove/:id')
  @Auth(Role.USER)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const article = await this.articlesService.findOne(id);
      if (!article)
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      return await this.articlesService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
