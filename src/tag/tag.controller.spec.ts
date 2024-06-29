import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  const mockTag = { tagId: 1, tag: 'Test Tag' };

  const mockTagService = {
    create: jest.fn().mockResolvedValue(mockTag),
    findAllTags: jest.fn().mockResolvedValue([mockTag]),
    findOneTag: jest.fn().mockImplementation((id: number) =>
      id === 1 ? Promise.resolve(mockTag) : Promise.reject(new HttpException('Tag not found', HttpStatus.BAD_REQUEST))
    ),
    update: jest.fn().mockResolvedValue(mockTag),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockTagService,
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
    it('should create a tag', async () => {
      const dto: CreateTagDto = { tag: 'Test Tag' };
      await expect(controller.create(dto)).resolves.toEqual(mockTag);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should handle error on create', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new HttpException('Error creating tag', HttpStatus.BAD_REQUEST));
      await expect(controller.create({ tag: 'Error Tag' })).rejects.toThrow('Error creating tag');
    });
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockTag]);
      expect(service.findAllTags).toHaveBeenCalled();
    });

    it('should handle error on findAll', async () => {
      jest.spyOn(service, 'findAllTags').mockRejectedValueOnce(new HttpException('Error finding tags', HttpStatus.BAD_REQUEST));
      await expect(controller.findAll()).rejects.toThrow('Error finding tags');
    });
  });

  describe('findOne', () => {
    it('should return a tag by ID', async () => {
      await expect(controller.findOne('1')).resolves.toEqual(mockTag);
      expect(service.findOneTag).toHaveBeenCalledWith(1);
    });

    it('should throw an error if tag not found', async () => {
      await expect(controller.findOne('2')).rejects.toThrow('Tag not found');
    });
  });

  describe('update', () => {
    it('should update a tag', async () => {
      const dto: UpdateTagDto = { tag: 'Updated Tag' };
      await expect(controller.update('1', dto)).resolves.toEqual(mockTag);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('should handle error on update', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new HttpException('Error updating tag', HttpStatus.BAD_REQUEST));
      await expect(controller.update('1', { tag: 'Error Tag' })).rejects.toThrow('Error updating tag');
    });
  });

  describe('remove', () => {
    it('should remove a tag by ID', async () => {
      await expect(controller.remove('1')).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should handle error on remove', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new HttpException('Error removing tag', HttpStatus.BAD_REQUEST));
      await expect(controller.remove('2')).rejects.toThrow('Error removing tag');
    });
  });
});
