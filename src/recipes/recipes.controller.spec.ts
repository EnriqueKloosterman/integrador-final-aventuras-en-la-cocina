import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { IUserActive } from '../common/inteface/user-active.interface';

describe('RecipesController', () => {
  let controller: RecipesController;
  let service: RecipesService;

  const mockUser: IUserActive = {
    userId: '1',
    userEmail: 'user@example.com',
    user_role: 'USER',
  };

  const mockRecipe: Recipe = {
    recipeId: '1',
    title: 'Test Recipe',
    description: JSON.stringify(['Description']),
    instructions: JSON.stringify(['Instruction']),
    ingredients: JSON.stringify(['Ingredient']),
    image: 'http://example.com/image.jpg',
    user: mockUser,
    category: null,
  };

  const mockCloudinaryResponse: CloudinaryResponse = {
    url: 'http://example.com/image.jpg',
    secure_url: 'https://example.com/image.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        {
          provide: RecipesService,
          useValue: {
            handleUpload: jest.fn().mockResolvedValue(mockCloudinaryResponse),
            findAll: jest.fn().mockResolvedValue([mockRecipe]),
            findAllUserRecipes: jest.fn().mockResolvedValue([mockRecipe]),
            findOne: jest.fn().mockResolvedValue(mockRecipe),
            update: jest.fn().mockResolvedValue(mockRecipe),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file and create a recipe', async () => {
      const createRecipeDto: CreateRecipeDto = {
        title: 'New Recipe',
        description: ['Step 1', 'Step 2'],
        instructions: ['Instruction 1'],
        ingredients: ['Ingredient 1'],
        categoryId: '1',
      };

      const image: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from(''),
        destination: '',
        filename: '',
        path: '',
        stream: null,
      };

      const result = await controller.uploadFile(image, createRecipeDto, mockUser);
      expect(service.handleUpload).toHaveBeenCalledWith(image, createRecipeDto, mockUser);
      expect(result).toEqual(mockCloudinaryResponse.url);
    });

    it('should throw an error if image or data is missing', async () => {
      await expect(controller.uploadFile(null, null, mockUser)).rejects.toThrow(
        new HttpException('image and data required', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('should return all recipes', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockRecipe]);
    });

    it('should throw an error if no recipes are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      await expect(controller.findAll()).rejects.toThrow(
        new HttpException('No recipes found', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAllUserRecipes', () => {
    it('should return all recipes for a user', async () => {
      const result = await controller.findAllUserRecipes(mockUser);
      expect(service.findAllUserRecipes).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual([mockRecipe]);
    });
  });

  describe('findOne', () => {
    it('should return a recipe by ID', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockRecipe);
    });

    it('should throw an error if recipe is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(controller.findOne('1')).rejects.toThrow(
        new HttpException('Recipe not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const updateRecipeDto: UpdateRecipeDto = {
        title: 'Updated Title',
        description: ['Updated description'],
        instructions: ['Updated instruction'],
        ingredients: ['Updated ingredient'],
        categoryId: '1',
      };

      const result = await controller.update('1', updateRecipeDto, mockUser);
      expect(service.update).toHaveBeenCalledWith('1', mockUser, updateRecipeDto);
      expect(result).toEqual(mockRecipe);
    });
  });

  describe('remove', () => {
    it('should remove a recipe', async () => {
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });

    it('should throw an error if recipe is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(controller.remove('1')).rejects.toThrow(
        new HttpException('Recipe not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
