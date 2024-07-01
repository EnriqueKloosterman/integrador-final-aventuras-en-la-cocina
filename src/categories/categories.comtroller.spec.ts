import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Category } from './entities/category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategory: Category = {
    categoryId: 1,
    category: 'Test Category',
    recipe: [], 
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockCategory),
            findAllCategories: jest.fn().mockResolvedValue([mockCategory]),
            findOneCategory: jest.fn().mockResolvedValue(mockCategory),
            update: jest.fn().mockResolvedValue(mockCategory),
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

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = { category: 'Test Category' };

      const result = await controller.create(createCategoryDto);
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
      expect(result).toEqual(mockCategory);
    });

    it('should throw an exception if category already exists', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new HttpException('Category already exists', HttpStatus.BAD_REQUEST));

      const createCategoryDto: CreateCategoryDto = { category: 'Test Category' };
      await expect(controller.create(createCategoryDto)).rejects.toThrow(
        new HttpException('Category already exists', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = await controller.findAll();
      expect(service.findAllCategories).toHaveBeenCalled();
      expect(result).toEqual([mockCategory]);
    });

    it('should throw an exception if no categories found', async () => {
      jest.spyOn(service, 'findAllCategories').mockRejectedValueOnce(new HttpException('No categories found', HttpStatus.BAD_REQUEST));

      await expect(controller.findAll()).rejects.toThrow(
        new HttpException('No categories found', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const result = await controller.findOne('1');
      expect(service.findOneCategory).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCategory);
    });

    it('should throw an exception if category not found', async () => {
      jest.spyOn(service, 'findOneCategory').mockRejectedValueOnce(new HttpException('Category not found', HttpStatus.NOT_FOUND));

      await expect(controller.findOne('2')).rejects.toThrow(
        new HttpException('Category not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto: UpdateCategoryDto = { category: 'Updated Category' };

      const result = await controller.update('1', updateCategoryDto);
      expect(service.update).toHaveBeenCalledWith(1, updateCategoryDto);
      expect(result).toEqual(mockCategory);
    });

    it('should throw an exception if category not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new HttpException('Category not found', HttpStatus.NOT_FOUND));

      const updateCategoryDto: UpdateCategoryDto = { category: 'Updated Category' };
      await expect(controller.update('2', updateCategoryDto)).rejects.toThrow(
        new HttpException('Category not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw an exception if category not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new HttpException('Category not found', HttpStatus.NOT_FOUND));

      await expect(controller.remove('2')).rejects.toThrow(
        new HttpException('Category not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
