import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn(),
            findAllCommentsByArticle: jest.fn(),
            findAllCommentsByRecipe: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCommentForArticle', () => {
    it('should create a new comment for an article', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'Test Comment',
        articleId: '1',
      };

      const expectedResult: Comment = {
        commentId: 1,
        comment: 'Test Comment',
        article: { articleId: '1' } as any,
        user: {} as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        recipe: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.createComentForArticle('1', createCommentDto, {});

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createCommentDto, {}, '1', undefined);
    });

    it('should throw HttpException if comment creation for article fails', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'Test Comment',
        articleId: '1',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new HttpException('Failed to create comment', HttpStatus.BAD_REQUEST));

      await expect(controller.createComentForArticle('1', createCommentDto, {})).rejects.toThrow(HttpException);
    });
  });

  // Resto de las pruebas...

  describe('remove', () => {
    it('should remove a comment', async () => {
      const commentId = 1;

      jest.spyOn(service, 'findOne').mockResolvedValue({
        commentId: commentId,
        comment: 'Comment to delete',
        article: {} as any,
        user: {} as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        recipe: null,
      });
      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove(commentId.toString());

      expect(service.remove).toHaveBeenCalledWith(commentId);
    });

    it('should throw HttpException if comment not found during remove', async () => {
      const commentId = 999;

      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.remove(commentId.toString())).rejects.toThrow(HttpException);
    });
  });
});
