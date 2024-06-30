import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Tag } from './entities/tag.entity';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  const mockTag: Tag = {
    tagId: 1,
    tag: 'Test Tag',
  };

  const mockCreateTagDto: CreateTagDto = {
    tag: 'Test Tag',
  };

  const mockUpdateTagDto: UpdateTagDto = {
    tag: 'Updated Test Tag',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockTag),
            findAllTags: jest.fn().mockResolvedValue([mockTag]),
            findOneTag: jest.fn().mockResolvedValue(mockTag),
            update: jest.fn().mockResolvedValue(mockTag),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new tag', async () => {
      const result = await controller.create(mockCreateTagDto);
      expect(service.create).toHaveBeenCalledWith(mockCreateTagDto);
      expect(result).toEqual(mockTag);
    });

    it('should throw an error if tag creation fails', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Error creating tag'));
      await expect(controller.create(mockCreateTagDto)).rejects.toThrow(
        new HttpException('Error creating tag', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const result = await controller.findAll();
      expect(service.findAllTags).toHaveBeenCalled();
      expect(result).toEqual([mockTag]);
    });

    it('should throw an error if finding tags fails', async () => {
      jest.spyOn(service, 'findAllTags').mockRejectedValueOnce(new Error('Error finding tags'));
      await expect(controller.findAll()).rejects.toThrow(
        new HttpException('Error finding tags', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findOne', () => {
    it('should return a tag by ID', async () => {
      const result = await controller.findOne('1');
      expect(service.findOneTag).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTag);
    });

    it('should throw an error if tag is not found', async () => {
      jest.spyOn(service, 'findOneTag').mockResolvedValueOnce(null);
      await expect(controller.findOne('1')).rejects.toThrow(
        new HttpException('Tag not found', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('update', () => {
    it('should update a tag', async () => {
      const result = await controller.update('1', mockUpdateTagDto);
      expect(service.update).toHaveBeenCalledWith(1, mockUpdateTagDto);
      expect(result).toEqual(mockTag);
    });

    it('should throw an error if update fails', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Error updating tag'));
      await expect(controller.update('1', mockUpdateTagDto)).rejects.toThrow(
        new HttpException('Error updating tag', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('remove', () => {
    it('should remove a tag', async () => {
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw an error if removal fails', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('Error removing tag'));
      await expect(controller.remove('1')).rejects.toThrow(
        new HttpException('Error removing tag', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
