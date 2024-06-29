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
        recipe: null, // Ensure to include all properties of Comment
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

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Failed to create comment'));

      await expect(controller.createComentForArticle('1', createCommentDto, {})).rejects.toThrow(HttpException);
    });
  });

  describe('createCommentForRecipe', () => {
    it('should create a new comment for a recipe', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'Test Comment',
        recipeId: '1',
      };

      const expectedResult: Comment = {
        commentId: 1,
        comment: 'Test Comment',
        recipe: { recipeId: '1' } as any,
        user: {} as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        article: null, // Ensure to include all properties of Comment
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.createComentForRecipe('1', createCommentDto, {});

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createCommentDto, {}, undefined, '1');
    });

    it('should throw HttpException if comment creation for recipe fails', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'Test Comment',
        recipeId: '1',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Failed to create comment'));

      await expect(controller.createComentForRecipe('1', createCommentDto, {})).rejects.toThrow(HttpException);
    });
  });

  describe('findAllCommentsByArticle', () => {
    it('should return an array of comments for an article', async () => {
      const expectedResult: any[] = [
        { commentId: 1, comment: 'Comment 1', article: {}, user: {}, createdAt: new Date(), updatedAt: new Date(), recipe: null },
        { commentId: 2, comment: 'Comment 2', article: {}, user: {}, createdAt: new Date(), updatedAt: new Date(), recipe: null },
      ];

      jest.spyOn(service, 'findAllCommentsByArticle').mockResolvedValue(expectedResult);

      const result = await controller.findAllCommentsByArtcicle('1');

      expect(result).toEqual(expectedResult);
      expect(service.findAllCommentsByArticle).toHaveBeenCalledWith('1');
    });

    it('should throw HttpException if no comments found for article', async () => {
      jest.spyOn(service, 'findAllCommentsByArticle').mockResolvedValue([]);

      await expect(controller.findAllCommentsByArtcicle('1')).rejects.toThrow(HttpException);
    });
  });

  describe('findAllCommentsByRecipe', () => {
    it('should return an array of comments for a recipe', async () => {
      const expectedResult: any[] = [
        { commentId: 1, comment: 'Comment 1', recipe: {}, user: {}, createdAt: new Date(), updatedAt: new Date(), article: null },
        { commentId: 2, comment: 'Comment 2', recipe: {}, user: {}, createdAt: new Date(), updatedAt: new Date(), article: null },
      ];

      jest.spyOn(service, 'findAllCommentsByRecipe').mockResolvedValue(expectedResult);

      const result = await controller.findAllCommentsByRecipe('1');

      expect(result).toEqual(expectedResult);
      expect(service.findAllCommentsByRecipe).toHaveBeenCalledWith('1');
    });

    it('should throw HttpException if no comments found for recipe', async () => {
      jest.spyOn(service, 'findAllCommentsByRecipe').mockResolvedValue([]);

      await expect(controller.findAllCommentsByRecipe('1')).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a comment by ID', async () => {
      const commentId = 1;
      const expectedResult: Comment = {
        commentId: commentId,
        comment: 'Test Comment',
        article: { articleId: '1' } as any,
        user: {} as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        recipe: null, // Ensure to include all properties of Comment
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(commentId.toString());

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(commentId);
    });

    it('should throw HttpException if comment not found', async () => {
      const commentId = 999;

      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.findOne(commentId.toString())).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a comment', async () => {
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = {
        comment: 'Updated Comment',
      };

      const updatedComment: Comment = {
        commentId: commentId,
        comment: 'Updated Comment',
        article: {} as any,
        user: {} as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        recipe: null, // Ensure to include all properties of Comment
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedComment);

      const result = await controller.update(commentId.toString(), updateCommentDto);

      expect(result).toEqual(updatedComment);
      expect(service.update).toHaveBeenCalledWith(commentId, updateCommentDto);
    });

    it('should throw HttpException if comment not found during update', async () => {
      const commentId = 999;
      const updateCommentDto: UpdateCommentDto = {
        comment: 'Updated Comment',
      };

      jest.spyOn(service, 'update').mockRejectedValue(new Error('Comment not found'));

      await expect(controller.update(commentId.toString(), updateCommentDto)).rejects.toThrow(HttpException);
    });
  });

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
        recipe: null, // Ensure to include all properties of Comment
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

