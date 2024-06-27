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
      providers: [CategoriesService],
    }).compile();
    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });
  it('deberia actualizar una categoria existente', async () => {
    const categoryId = '1';
    const updateCategoryDto: UpdateCategoryDto = { category: 'Categoria Actualizada' };
    const updatedCategory: Category = { id: categoryId, category: 'Categoria Actualizada' };
    jest.spyOn(service, 'update').mockResolvedValue(updatedCategory as Category);
    const result = await controller.update(categoryId, updateCategoryDto);
    expect(result).toEqual(updatedCategory);
  });
  it('deberia manejar el error al intentar actualizar una categoria', async () => {
    const categoryId = '1';
    const updateCategoryDto: UpdateCategoryDto = { category: 'Categoria Actualizada' };
    jest.spyOn(service, 'update').mockRejectedValue(new HttpException('categoria no encontrada', HttpStatus.NOT_FOUND));
    try {
      await controller.update(categoryId, updateCategoryDto);
    } catch (error) {
      expect(error.response).toEqual('categoria no encontrada');
      expect(error.status).toEqual(HttpStatus.NOT_FOUND);
    }
  });
  it('deberia eliminar una categoria existente', async () => {
    const categoryId = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await controller.remove(categoryId);
    expect(service.remove).toHaveBeenCalledWith(categoryId);
  });
  it('deberia manejar el error al intentar eliminar una categoria', async () => {
    const categoryId = 'invalid_id';
    jest.spyOn(service, 'remove').mockRejectedValue(new HttpException('Error al eliminar la categoria', HttpStatus.NOT_FOUND));
    try {
      await controller.remove(categoryId);
    } catch (error) {
      expect(error.response).toEqual('Error al eliminar la categoria');
      expect(error.status).toEqual(HttpStatus.NOT_FOUND);
    }
  });
});
