import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from '../constants/file-upload.validator';
import { CONSTANTS } from '../constants/constants';
import { ActiveUser } from '../common/decorators/active.user.decorator';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { IUserActive } from '../common/inteface/user-active.interface';
import { Recipe } from './entities/recipe.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiBearerAuth()
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
  @UsePipes(new ValidationPipe({ transform: true}))
  async findAll() {
    try {
      const recipes = await this.recipesService.findAll();
      if(recipes.length) return recipes      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @ApiBearerAuth()
  @Get('user')
  @Auth(Role.USER)
  async findAllUserRecipes(@ActiveUser() user: IUserActive): Promise<Recipe[]>{
    try {
      return await this.recipesService.findAllUserRecipes(user)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  @Get('recipe/:id')
  async findOne(@Param('id') id: string): Promise<Recipe> {
    try {
      const recipe = await this.recipesService.findOne(id);
      if(!recipe) throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
      return recipe
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
  //TODO: testear el update
  @ApiBearerAuth()
  @Patch('update/recipe/:id')
  @Auth(Role.USER)
  @UsePipes(new ValidationPipe({ transform: true}))
  async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto | string, @ActiveUser() user: IUserActive): Promise<Recipe> {
    try {
      if(typeof updateRecipeDto === 'string'){
        updateRecipeDto = {instructions: updateRecipeDto}
      }
      const recipe = await this.recipesService.update(id, user, updateRecipeDto,); 
      return recipe
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @ApiBearerAuth()
  @Delete('remove/:id')
  @Auth(Role.USER)
  @UsePipes(new ValidationPipe({ transform: true}))
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const recipe = await this.recipesService.findOne(id);
      if(!recipe) throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
      await this.recipesService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
