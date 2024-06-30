import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { HttpException } from '@nestjs/common';

interface IUserActive {
  userId: string;
  userName: string; 
  userLastName: string;
  userEmail: string;
  image: string;
  role: string;
}

describe('RecipesController', () => {
  let controller: RecipesController;
  let service: RecipesService;

  const mockRecipe = {
    recipeId: '1',
    title: 'Recipe 1',
    description: ['Delicious recipe'],
    instructions: ['Step 1', 'Step 2'],
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    image: 'image_url',
    categoryId: 1,
    userId: 'user1',
  };

  const mockRecipesService = {
    findAll: jest.fn().mockResolvedValue([mockRecipe]),
    findOne: jest.fn().mockImplementation((id: string) => {
      if (id === '1') return Promise.resolve(mockRecipe);
      throw new HttpException('Recipe not found', 404);
    }),
    create: jest.fn().mockResolvedValue(mockRecipe),
    update: jest.fn().mockResolvedValue(mockRecipe),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        {
          provide: RecipesService,
          useValue: mockRecipesService,
        },
      ],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of recipes', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockRecipe]);
    });
  });

  describe('findOne', () => {
    it('should return a recipe by ID', async () => {
      await expect(controller.findOne('1')).resolves.toEqual(mockRecipe);
    });

    it('should throw an error if recipe not found', async () => {
      await expect(controller.findOne('2')).rejects.toThrow('Recipe not found');
    });
  });

  describe('create', () => {
    it('should create a new recipe', async () => {
      const createRecipeDto: CreateRecipeDto = {
        title: 'New Recipe',
        description: ['New Description'],
        instructions: ['New Instructions'],
        ingredients: ['New Ingredients'],
        image: 'new_image_url',
        categoryId: 1,
        userId: 'user1',
      };

      const activeUser: IUserActive = {
        userId: 'user1',
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        image: 'user1_image_url',
        role: 'admin',
      };

      await expect(
        controller.uploadFile(null, createRecipeDto, activeUser)
      ).resolves.toEqual(mockRecipe);
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const updateRecipeDto: UpdateRecipeDto = {
        title: 'Updated Recipe',
      };

      const activeUser: IUserActive = {
        userId: 'user1',
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        image: 'user1_image_url',
        role: 'admin',
      };

      await expect(
        controller.update('1', updateRecipeDto, activeUser)
      ).resolves.toEqual(mockRecipe);
    });
  });

  describe('remove', () => {
    it('should remove a recipe by ID', async () => {
      await expect(controller.remove('1')).resolves.toBeUndefined();
    });
  });
});

