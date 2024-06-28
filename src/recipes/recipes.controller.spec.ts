import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';

describe('RecipesController', () => {
  let controller: RecipesController;
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [RecipesService],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const mockCreateRecipeDto: CreateRecipeDto = {
      title: 'Recipe Title',
      description: ['Description line 1', 'Description line 2'],
      instructions: ['Instruction 1', 'Instruction 2'],
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      image: 'recipe-image.jpg',
      categoryId: 1,
      userId: '1',
    };

    it('should create a recipe', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockCreateRecipeDto);

      const result = await controller.create(mockCreateRecipeDto);
      expect(result).toEqual(mockCreateRecipeDto);
    });

    it('should handle failure in recipe creation', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error('Failed to create recipe'));

      try {
        await controller.create(mockCreateRecipeDto);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Failed to create recipe');
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of recipes', async () => {
      const mockRecipes = [
        {
          id: '1',
          title: 'Recipe 1',
          description: ['Description 1'],
          instructions: ['Instruction 1'],
          ingredients: ['Ingredient 1'],
          image: 'recipe1.jpg',
          categoryId: 1,
          userId: '1',
        },
        {
          id: '2',
          title: 'Recipe 2',
          description: ['Description 2'],
          instructions: ['Instruction 2'],
          ingredients: ['Ingredient 2'],
          image: 'recipe2.jpg',
          categoryId: 2,
          userId: '2',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockRecipes);

      const result = await controller.findAll();
      expect(result).toEqual(mockRecipes);
    });
  });

  describe('findOne', () => {
    it('should return a recipe by ID', async () => {
      const mockRecipeId = '1';
      const mockRecipe = {
        id: '1',
        title: 'Recipe 1',
        description: ['Description 1'],
        instructions: ['Instruction 1'],
        ingredients: ['Ingredient 1'],
        image: 'recipe1.jpg',
        categoryId: 1,
        userId: '1',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockRecipe);

      const result = await controller.findOne(mockRecipeId);
      expect(result).toEqual(mockRecipe);
    });

    it('should throw NotFoundException when recipe is not found', async () => {
      const mockRecipeId = '999';

      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Recipe not found'));

      try {
        await controller.findOne(mockRecipeId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Recipe not found');
      }
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const mockRecipeId = '1';
      const mockUpdateRecipeDto: UpdateRecipeDto = {
        title: 'Updated Recipe Title',
      };

      jest.spyOn(service, 'update').mockResolvedValue({
        id: '1',
        ...mockUpdateRecipeDto,
      });

      const result = await controller.update(mockRecipeId, mockUpdateRecipeDto);
      expect(result).toEqual({
        id: '1',
        ...mockUpdateRecipeDto,
      });
    });

    it('should throw BadRequestException when recipe is not found', async () => {
      const mockRecipeId = '999';
      const mockUpdateRecipeDto: UpdateRecipeDto = {
        title: 'Updated Recipe Title',
      };

      jest.spyOn(service, 'update').mockRejectedValue(new BadRequestException('Recipe not found'));

      try {
        await controller.update(mockRecipeId, mockUpdateRecipeDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Recipe not found');
      }
    });
  });

  describe('remove', () => {
    it('should remove a recipe', async () => {
      const mockRecipeId = '1';

      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove(mockRecipeId);
      expect(service.remove).toHaveBeenCalledWith(mockRecipeId);
    });

    it('should throw BadRequestException when recipe is not found', async () => {
      const mockRecipeId = '999';

      jest.spyOn(service, 'remove').mockRejectedValue(new BadRequestException('Recipe not found'));

      try {
        await controller.remove(mockRecipeId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Recipe not found');
      }
    });
  });
});
