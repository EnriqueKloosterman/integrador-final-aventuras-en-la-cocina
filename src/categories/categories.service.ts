import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        category: createCategoryDto.category
      }
    });
    if(category) throw new BadRequestException('Category already exists');
    const newCategory = this.categoryRepository.create(createCategoryDto);
    try {
      newCategory.category = createCategoryDto.category;
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    try{
      if(!categories){
        throw new BadRequestException('No categories found');
      }
      return categories
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

  async findOneCategory(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { 
        categoryId: id  
      }
    });
    try {
      if(!category) throw new BadRequestException('Category not found');
      return category;
    } catch (error) {
      throw new BadRequestException('Category does not exist');
    }
  }
    

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
    const category = await this.categoryRepository.findOne({
      where: {
        categoryId: id
      }
    });
      if(!category) throw new BadRequestException('Category not found');
      category.category = updateCategoryDto.category;
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException('Category does not exist');
    }
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: {
        categoryId: id
      }
    });
    try {
      if(!category) throw new BadRequestException('Category not found');
      await this.categoryRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Category does not exist');
    }
  }
}
