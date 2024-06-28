import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';

describe('RecipesController', () => {
  let controller: RecipesController;
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        {
          provide: RecipesService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
    service = module.get<RecipesService>(RecipesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createRecipeDto: CreateRecipeDto = {
      title: 'Test Recipe',
      description: ['Description 1', 'Description 2'],
      instructions: ['Instruction 1', 'Instruction 2'],
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      image: 'recipe.jpg',
      categoryId: 1,
      userId: 'user-id',
    };

    it('should create a recipe', async () => {
      const createdRecipe: Recipe = {
        articleId: '1', // Assuming `recipeId` is of type string in your `Recipe` entity
        ...createRecipeDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdRecipe);

      const result = await controller.create(createRecipeDto);

      expect(result).toEqual(createdRecipe);
    });

    it('should throw an error if creation fails', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error('Creation failed'));

      await expect(controller.create(createRecipeDto)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    const recipeId = '1';
    const updateRecipeDto: UpdateRecipeDto = {
      title: 'Updated Recipe',
      description: ['Updated Description 1', 'Updated Description 2'],
      instructions: ['Updated Instruction 1', 'Updated Instruction 2'],
      ingredients: ['Updated Ingredient 1', 'Updated Ingredient 2'],
      image: 'updated.jpg',
      categoryId: 2,
      userId: 'user-id',
    };

    it('should update a recipe', async () => {
      const updatedRecipe: Recipe = {
        articleId: recipeId, // Assuming `recipeId` is of type string in your `Recipe` entity
        ...updateRecipeDto,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedRecipe);

      const result = await controller.update(recipeId, updateRecipeDto);

      expect(result).toEqual(updatedRecipe);
    });

    it('should throw an error if update fails', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error('Update failed'));

      await expect(controller.update(recipeId, updateRecipeDto)).rejects.toThrow(HttpException);
    });

    it('should throw a NotFoundException if recipe is not found', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(undefined);

      await expect(controller.update(recipeId, updateRecipeDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    const recipeId = '1';

    it('should remove a recipe', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove(recipeId);

      expect(service.remove).toHaveBeenCalledWith(recipeId);
    });

    it('should throw a NotFoundException if recipe is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.remove(recipeId)).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if service throws', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({} as Recipe);
      jest.spyOn(service, 'remove').mockRejectedValue(new Error('Service error'));

      await expect(controller.remove(recipeId)).rejects.toThrow(HttpException);
    });
  });
});
