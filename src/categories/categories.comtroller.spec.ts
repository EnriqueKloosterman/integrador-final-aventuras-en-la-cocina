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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        category: 'Test Category',
      };

      const expectedResult: Category = {
        categoryId: 1,
        category: 'Test Category',
        recipe: [],
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createCategoryDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
    });

    it('should throw HttpException if category creation fails', async () => {
      const createCategoryDto: CreateCategoryDto = {
        category: 'Test Category',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Failed to create category'));

      await expect(controller.create(createCategoryDto)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const expectedResult: Category[] = [
        {
          categoryId: 1,
          category: 'Category 1',
          recipe: [],
        },
        {
          categoryId: 2,
          category: 'Category 2',
          recipe: [],
        },
      ];

      jest.spyOn(service, 'findAllCategories').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAllCategories).toHaveBeenCalled();
    });

    it('should throw HttpException if no categories found', async () => {
      jest.spyOn(service, 'findAllCategories').mockResolvedValue([]);

      await expect(controller.findAll()).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a category by ID', async () => {
      const categoryId = 1;
      const expectedResult: Category = {
        categoryId: categoryId,
        category: 'Category 1',
        recipe: [],
      };

      jest.spyOn(service, 'findOneCategory').mockResolvedValue(expectedResult);

      const result = await controller.findOne(categoryId.toString());

      expect(result).toEqual(expectedResult);
      expect(service.findOneCategory).toHaveBeenCalledWith(categoryId);
    });

    it('should throw HttpException if category not found', async () => {
      const categoryId = 999;

      jest.spyOn(service, 'findOneCategory').mockResolvedValue(undefined);

      await expect(controller.findOne(categoryId.toString())).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const categoryId = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        category: 'Updated Category',
      };

      const updatedCategory: Category = {
        categoryId: categoryId,
        category: 'Updated Category',
        recipe: [],
      };

      jest.spyOn(service, 'findOneCategory').mockResolvedValue(updatedCategory);
      jest.spyOn(service, 'update').mockResolvedValue(updatedCategory);

      const result = await controller.update(categoryId.toString(), updateCategoryDto);

      expect(result).toEqual(updatedCategory);
      expect(service.update).toHaveBeenCalledWith(categoryId, updateCategoryDto);
    });

    it('should throw HttpException if category not found during update', async () => {
      const categoryId = 999;
      const updateCategoryDto: UpdateCategoryDto = {
        category: 'Updated Category',
      };

      jest.spyOn(service, 'findOneCategory').mockResolvedValue(undefined);

      await expect(controller.update(categoryId.toString(), updateCategoryDto)).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const categoryId = 1;

      jest.spyOn(service, 'findOneCategory').mockResolvedValue({
        categoryId: categoryId,
        category: 'Category to delete',
        recipe: [],
      });
      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove(categoryId.toString());

      expect(service.remove).toHaveBeenCalledWith(categoryId);
    });

    it('should throw HttpException if category not found during remove', async () => {
      const categoryId = 999;

      jest.spyOn(service, 'findOneCategory').mockResolvedValue(undefined);

      await expect(controller.remove(categoryId.toString())).rejects.toThrow(HttpException);
    });
  });
});

