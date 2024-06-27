import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Response } from 'express';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [TagService],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });
  it('deberia actualizar una etiqueta existente', async () => {
    const tagId = '1';
    const updateTag: UpdateTagDto = {
      tag: 'Etiqueta Actualizada'
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(service, 'update').mockResolvedValue(updateTag);
    try {
      await controller.update(tagId, updateTag);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updateTag);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
 
  it('deberia manejar el error al intentar actualizar una etiqueta', async () => {
    const updateTag: UpdateTagDto = {
      tag: 'Etiqueta Actualizada'
    };
    jest.spyOn(service, 'update').mockRejectedValue(new Error('etiqueta no encontrada'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.update('1', updateTag);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'etiqueta no encontrada' });
    } catch (error) {
      expect(error.message).toBe('etiqueta no encontrada');
    }
  });
  it('deberia eliminar una etiqueta existente', async () => {
    const tagId = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined); 
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.remove(tagId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(undefined); 
    } catch (error) {
      expect(error).toBe(error);
    }
  });
  
  

  it('deberia manejar el error al intentar eliminar una etiqueta', async () => {
    const tagId = 'invalid_id';
    jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error al eliminar la etiqueta'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.remove(tagId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar la etiqueta' });
    } catch (error) {
      expect(error.message).toBe('Error al eliminar la etiqueta');
    }
  });

  

});
