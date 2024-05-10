import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, HttpException } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from 'src/constants/file-upload.validator';
import { CONSTANTS } from 'src/constants/constants';
import { ActiveUser } from 'src/common/decorators/active.user.decorator';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('register')
  @Auth(Role.USER)
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addValidator(
        new CustomUploadFileTypeValidator({
          fileType: CONSTANTS.valid_mime_types
        })
      )
      .addMaxSizeValidator({ maxSize: CONSTANTS.max_bytes_pic_size})
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
    )image: Express.Multer.File,
    @Body() createRecipeDto: CreateRecipeDto, @ActiveUser() user: any): Promise<string>{
      if(!image || !createRecipeDto){
        throw new HttpException('image and data required', HttpStatus.BAD_REQUEST)
      }
      try {
        const response: CloudinaryResponse = await this.recipesService.handleUpload(image, createRecipeDto, user)
        return response.url
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
    }

  @Get('recipes')
  async findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
