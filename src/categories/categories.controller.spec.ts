import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: jest.fn(),
            findAllCategories: jest.fn(),
            findOneCategory: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto: CreateCategoryDto = { category: 'New Category' };
    const result = { categoryId: 1, ...createCategoryDto };

    jest.spyOn(service, 'create').mockResolvedValue(result as Category);

    expect(await controller.create(createCategoryDto)).toBe(result);
  });

  it('should find all categories', async () => {
    const result = [{ categoryId: 1, category: 'Category 1', recipe: [] }];

    jest.spyOn(service, 'findAllCategories').mockResolvedValue(result as Category[]);

    expect(await controller.findAll()).toBe(result);
  });

  it('should find one category', async () => {
    const result = { categoryId: 1, category: 'Category 1', recipe: [] };

    jest.spyOn(service, 'findOneCategory').mockResolvedValue(result as Category);

    expect(await controller.findOne('1')).toBe(result);
  });

  it('should handle category not found', async () => {
    jest.spyOn(service, 'findOneCategory').mockResolvedValue(null);

    try {
      await controller.findOne('1');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('should update a category', async () => {
    const updateCategoryDto: UpdateCategoryDto = { category: 'Updated Category' };
    const result = { categoryId: 1, ...updateCategoryDto };

    jest.spyOn(service, 'update').mockResolvedValue(result as Category);

    expect(await controller.update('1', updateCategoryDto)).toBe(result);
  });

  it('should handle update category not found', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(null);

    try {
      await controller.update('1', { category: 'Updated Category' });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('should remove a category', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should handle remove category not found', async () => {
    jest.spyOn(service, 'remove').mockRejectedValue(new HttpException('Category not found', HttpStatus.NOT_FOUND));

    try {
      await controller.remove('1');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
