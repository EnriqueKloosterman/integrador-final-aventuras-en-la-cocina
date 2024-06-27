import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCommentForArticle', () => {
    const mockCreateCommentDto: CreateCommentDto = {
      comment: 'Test comment',
    };

    it('should create a comment for an article', async () => {
      const mockUser = { userId: 1, username: 'testuser' };
      const mockArticleId = '1';

      jest.spyOn(service, 'create').mockImplementation(async () => ({
        commentId: 1,
        comment: 'Test comment',
        user: mockUser,
      }));

      const result = await controller.createCommentForArticle(mockArticleId, mockCreateCommentDto, mockUser);
      expect(result).toEqual({
        commentId: expect.any(Number),
        comment: 'Test comment',
        user: mockUser,
      });
    });

    it('should throw BadRequestException when user or comment data is missing', async () => {
      const mockUser = { userId: 1, username: 'testuser' };
      const mockArticleId = '1';

      try {
        await controller.createCommentForArticle(mockArticleId, null, mockUser);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('User and comment data required');
      }
    });
  });

  describe('createCommentForRecipe', () => {
    const mockCreateCommentDto: CreateCommentDto = {
      comment: 'Test comment',
    };

    it('should create a comment for a recipe', async () => {
      const mockUser = { userId: 1, username: 'testuser' };
      const mockRecipeId = '1';

      jest.spyOn(service, 'create').mockImplementation(async () => ({
        commentId: 1,
        comment: 'Test comment',
        user: mockUser,
      }));

      const result = await controller.createCommentForRecipe(mockRecipeId, mockCreateCommentDto, mockUser);
      expect(result).toEqual({
        commentId: expect.any(Number),
        comment: 'Test comment',
        user: mockUser,
      });
    });

    it('should throw BadRequestException when user or comment data is missing', async () => {
      const mockUser = { userId: 1, username: 'testuser' };
      const mockRecipeId = '1';

      try {
        await controller.createCommentForRecipe(mockRecipeId, null, mockUser);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('User and comment data required');
      }
    });
  });

  describe('findAllCommentsByArticle', () => {
    it('should return comments for an article', async () => {
      const mockArticleId = '1';
      jest.spyOn(service, 'findAllCommentsByArticle').mockImplementation(async () => [
        {
          commentId: 1,
          comment: 'Test comment 1',
          user: { userId: 1, username: 'user1' },
        },
        {
          commentId: 2,
          comment: 'Test comment 2',
          user: { userId: 2, username: 'user2' },
        },
      ]);

      const result = await controller.findAllCommentsByArticle(mockArticleId);
      expect(result).toHaveLength(2);
      expect(result[0].comment).toBe('Test comment 1');
      expect(result[1].user.username).toBe('user2');
    });

    it('should throw NotFoundException when article is not found', async () => {
      const mockArticleId = '999';

      jest.spyOn(service, 'findAllCommentsByArticle').mockImplementation(async () => {
        throw new NotFoundException('Article not found');
      });

      try {
        await controller.findAllCommentsByArticle(mockArticleId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Article not found');
      }
    });
  });

  describe('findAllCommentsByRecipe', () => {
    it('should return comments for a recipe', async () => {
      const mockRecipeId = '1';
      jest.spyOn(service, 'findAllCommentsByRecipe').mockImplementation(async () => [
        {
          commentId: 1,
          comment: 'Test comment 1',
          user: { userId: 1, username: 'user1' },
        },
        {
          commentId: 2,
          comment: 'Test comment 2',
          user: { userId: 2, username: 'user2' },
        },
      ]);

      const result = await controller.findAllCommentsByRecipe(mockRecipeId);
      expect(result).toHaveLength(2);
      expect(result[0].comment).toBe('Test comment 1');
      expect(result[1].user.username).toBe('user2');
    });

    it('should throw NotFoundException when recipe is not found', async () => {
      const mockRecipeId = '999';

      jest.spyOn(service, 'findAllCommentsByRecipe').mockImplementation(async () => {
        throw new NotFoundException('Recipe not found');
      });

      try {
        await controller.findAllCommentsByRecipe(mockRecipeId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Recipe not found');
      }
    });
  });

  describe('findOne', () => {
    it('should return a comment by ID', async () => {
      const mockCommentId = '1';
      const mockComment = {
        commentId: 1,
        comment: 'Test comment',
        user: { userId: 1, username: 'testuser' },
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => mockComment);

      const result = await controller.findOne(mockCommentId);
      expect(result).toEqual(mockComment);
    });

    it('should throw BadRequestException when comment is not found', async () => {
      const mockCommentId = '999';

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        throw new BadRequestException('Comment not found');
      });

      try {
        await controller.findOne(mockCommentId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Comment not found');
      }
    });
  });

  describe('update', () => {
    it('should update a comment', async () => {
      const mockCommentId = '1';
      const mockUpdateCommentDto: UpdateCommentDto = {
        comment: 'Updated comment',
      };

      jest.spyOn(service, 'update').mockImplementation(async () => ({
        commentId: 1,
        comment: 'Updated comment',
      }));

      const result = await controller.update(mockCommentId, mockUpdateCommentDto);
      expect(result).toEqual({
        commentId: expect.any(Number),
        comment: 'Updated comment',
      });
    });

    it('should throw BadRequestException when comment is not found', async () => {
      const mockCommentId = '999';
      const mockUpdateCommentDto: UpdateCommentDto = {
        comment: 'Updated comment',
      };

      jest.spyOn(service, 'update').mockImplementation(async () => {
        throw new BadRequestException('Comment not found');
      });

      try {
        await controller.update(mockCommentId, mockUpdateCommentDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Comment not found');
      }
    });
  });

  describe('remove', () => {
    it('should remove a comment', async () => {
      const mockCommentId = '1';
      jest.spyOn(service, 'findOne').mockImplementation(async () => ({
        commentId: 1,
        comment: 'Test comment',
      }));

      jest.spyOn(service, 'remove').mockImplementation(async () => {});

      await controller.remove(mockCommentId);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw BadRequestException when comment is not found', async () => {
      const mockCommentId = '999';

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        throw new BadRequestException('Comment not found');
      });

      try {
        await controller.remove(mockCommentId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Comment not found');
      }
    });
  });
});

