import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  
  @ApiBearerAuth()
  @Post('register/category')
  @Auth(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryDto> {
    try {
      return await this.categoriesService.create(createCategoryDto);
    } catch (error) {
      throw new HttpException(
        'Error creating category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('categories')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(): Promise<CreateCategoryDto[]> {
    try {
      const categories = await this.categoriesService.findAllCategories();
      if (categories.length) {
        return categories;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('category/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: string): Promise<CreateCategoryDto> {
    try {
      const category = await this.categoriesService.findOneCategory(+id);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @ApiBearerAuth()
  @Patch('update/category/:id')
  @Auth(Role.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateCategoryDto> {
    try {
      const category = await this.categoriesService.findOneCategory(+id);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return this.categoriesService.update(+id, updateCategoryDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @Delete('remove/category/:id')
  @Auth(Role.ADMIN)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const category = await this.categoriesService.findOneCategory(+id);
      if (category) {
        await this.categoriesService.remove(+id);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
