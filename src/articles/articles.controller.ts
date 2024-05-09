import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, HttpException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from 'src/constants/file-upload.validator';
import { CONSTANTS } from 'src/constants/constants';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Auth(Role.USER)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addValidator(
        new CustomUploadFileTypeValidator({
          fileType: CONSTANTS.valid_mime_types
        })
      )
      .addMaxSizeValidator({ maxSize: CONSTANTS.max_bytes_pic_size })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
    )image: Express.Multer.File,
    @Body() createArticleDto: CreateArticleDto): Promise<string> {
      if(!image || !createArticleDto){
        throw new HttpException('Image and data required', HttpStatus.BAD_REQUEST)
      }
      try {
        const response: CloudinaryResponse = await this.articlesService.handleUpload(image, createArticleDto)
        return response.url
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
  }

  @Get('articles')
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
