import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

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

    const result = await controller.update(tagId, updateTag);
    expect(result).toEqual(updatedTag);
  });

  it('debería manejar el error al intentar actualizar una etiqueta', async () => {
    const tagId = '1';
    const updateTag: UpdateTagDto = {
      tag: 'Etiqueta Actualizada'
    };

    jest.spyOn(service, 'update').mockRejectedValue(new Error('etiqueta no encontrada'));

    try {
      await controller.update(tagId, updateTag);
    } catch (error) {
      expect(error.message).toBe('etiqueta no encontrada');
    }
  });

  it('debería eliminar una etiqueta existente', async () => {
    const tagId = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    const result = await controller.remove(tagId);
    expect(result).toEqual({ message: 'Etiqueta eliminada exitosamente' });
  });

  it('debería manejar el error al intentar eliminar una etiqueta', async () => {
    const tagId = 'invalid_id';
    jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error al eliminar la etiqueta'));

    try {
      await controller.remove(tagId);
    } catch (error) {
      expect(error.message).toBe('Error al eliminar la etiqueta');
    }
  });
});

