import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';

describe('CategoryController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('deberia actualizar una categoria existente', async () => {
    const categoryId = '1';
    const updateCategory: UpdateCategoryDto = {
      category: 'Categoria Actualizada',
    };
    jest.spyOn(service, 'update').mockResolvedValue(updateCategory);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.update(categoryId, updateCategory);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updateCategory);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('deberia manejar el error al intentar actualizar una categoria', async () => {
    const updateCategory: UpdateCategoryDto = {
      category: 'Categoria Actualizada',
    };
    jest.spyOn(service, 'update').mockRejectedValue(new Error('categoria no encontrada'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.update('1', updateCategory);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'categoria no encontrada' });
    } catch (error) {
      expect(error.message).toBe('categoria no encontrada');
    }
  });

  it('deberia eliminar una categoria existente', async () => {
    const categoryId = '1';
    const deletedCategory: CreateCategoryDto = {
      category: 'Categoria Eliminada',
    };
    jest.spyOn(service, 'remove').mockResolvedValue(deletedCategory);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.remove(categoryId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(deletedCategory);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('deberia manejar el error al intentar eliminar una categoria', async () => {
    const categoryId = 'invalid_id';
    jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error al eliminar la categoria'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.remove(categoryId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar la categoria' });
    } catch (error) {
      expect(error.message).toBe('Error al eliminar la categoria');
    }
  });

  
});
