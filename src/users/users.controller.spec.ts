import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
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

  it('debería actualizar una etiqueta existente', async () => {
    const tagId = '1';
    const updateTag: UpdateTagDto = {
      tag: 'Etiqueta Actualizada'
    };
    const updatedTag: Tag = {
      tagId: 1,
      tag: 'Etiqueta Actualizada',
      article: null // Asegúrate de agregar todas las propiedades necesarias de Tag
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedTag);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.update(tagId, updateTag, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTag);
  });

  it('debería manejar el error al intentar actualizar una etiqueta', async () => {
    const updateTag: UpdateTagDto = {
      tag: 'Etiqueta Actualizada'
    };

    jest.spyOn(service, 'update').mockRejectedValue(new Error('etiqueta no encontrada'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.update('1', updateTag, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'etiqueta no encontrada' });
  });

  it('debería eliminar una etiqueta existente', async () => {
    const tagId = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.remove(tagId, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Etiqueta eliminada exitosamente' });
  });

  it('debería manejar el error al intentar eliminar una etiqueta', async () => {
    const tagId = 'invalid_id';
    jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error al eliminar la etiqueta'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.remove(tagId, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar la etiqueta' });
  });
});
