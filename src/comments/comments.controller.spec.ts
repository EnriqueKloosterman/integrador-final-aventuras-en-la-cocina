import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Article } from '../articles/entities/article.entity';
import { Recipe } from '../recipes/entities/recipe.entity';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Article),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Recipe),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCommentForArticle', () => {
    it('should create a comment for an article', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'This is a test comment',
        articleId: '1',
      };

      const user = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'create').mockResolvedValue({ ...createCommentDto, user });

      const result = await controller.createComentForArticle('1', createCommentDto, user);

      expect(result).toEqual({ ...createCommentDto, user });
      expect(service.create).toHaveBeenCalledWith(createCommentDto, user, '1');
    });

    it('should handle errors during comment creation for article', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'This is a test comment',
        articleId: '1',
      };

      const user = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Comment creation failed'));

      await expect(controller.createComentForArticle('1', createCommentDto, user)).rejects.toThrow(HttpException);
    });
  });

  describe('createCommentForRecipe', () => {
    it('should create a comment for a recipe', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'This is a test comment',
        recipeId: '1',
      };

      const user = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'create').mockResolvedValue({ ...createCommentDto, user });

      const result = await controller.createComentForRecipe('1', createCommentDto, user);

      expect(result).toEqual({ ...createCommentDto, user });
      expect(service.create).toHaveBeenCalledWith(createCommentDto, user, undefined, '1');
    });

    it('should handle errors during comment creation for recipe', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'This is a test comment',
        recipeId: '1',
      };

      const user = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Comment creation failed'));

      await expect(controller.createComentForRecipe('1', createCommentDto, user)).rejects.toThrow(HttpException);
    });
  });

  describe('findAllCommentsByArticle', () => {
    it('should return comments for an article', async () => {
      const articleId = '1';
      const comments: any[] = [
        { commentId: 1, comment: 'Comment 1', user: { name: 'User 1', lastName: 'Last Name', image: 'user1.jpg' } },
        { commentId: 2, comment: 'Comment 2', user: { name: 'User 2', lastName: 'Last Name', image: 'user2.jpg' } },
      ];

      jest.spyOn(service, 'findAllCommentsByArticle').mockResolvedValue(comments);

      const result = await controller.findAllCommentsByArtcicle(articleId);

      expect(result).toEqual(comments);
      expect(service.findAllCommentsByArticle).toHaveBeenCalledWith(articleId);
    });

    it('should handle errors when fetching comments for an article', async () => {
      const articleId = '1';

      jest.spyOn(service, 'findAllCommentsByArticle').mockRejectedValue(new Error('Error fetching comments'));

      await expect(controller.findAllCommentsByArtcicle(articleId)).rejects.toThrow(HttpException);
    });
  });

  describe('findAllCommentsByRecipe', () => {
    it('should return comments for a recipe', async () => {
      const recipeId = '1';
      const comments: any[] = [
        { commentId: 1, comment: 'Comment 1', user: { name: 'User 1', image: 'user1.jpg' } },
        { commentId: 2, comment: 'Comment 2', user: { name: 'User 2', image: 'user2.jpg' } },
      ];

      jest.spyOn(service, 'findAllCommentsByRecipe').mockResolvedValue(comments);

      const result = await controller.findAllCommentsByRecipe(recipeId);

      expect(result).toEqual(comments);
      expect(service.findAllCommentsByRecipe).toHaveBeenCalledWith(recipeId);
    });

    it('should handle errors when fetching comments for a recipe', async () => {
      const recipeId = '1';

      jest.spyOn(service, 'findAllCommentsByRecipe').mockRejectedValue(new Error('Error fetching comments'));

      await expect(controller.findAllCommentsByRecipe(recipeId)).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a comment by id', async () => {
      const commentId = '1';
      const comment: any = { commentId: 1, comment: 'Test Comment', user: { name: 'Test User', image: 'test.jpg' } };

      jest.spyOn(service, 'findOne').mockResolvedValue(comment);

      const result = await controller.findOne(commentId);

      expect(result).toEqual(comment);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should handle errors when fetching a comment by id', async () => {
      const commentId = '1';

      jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Comment not found'));

      await expect(controller.findOne(commentId)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a comment', async () => {
      const commentId = '1';
      const updateCommentDto: UpdateCommentDto = { comment: 'Updated Comment' };

      jest.spyOn(service, 'update').mockResolvedValue(updateCommentDto);

      const result = await controller.update(commentId, updateCommentDto);

      expect(result).toEqual(updateCommentDto);
      expect(service.update).toHaveBeenCalledWith(1, updateCommentDto);
    });
  });

  describe('remove', () => {
    it('should remove a comment', async () => {
      const commentId = '1';

      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove(commentId);

      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should handle errors when removing a comment', async () => {
      const commentId = '1';

      jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error removing comment'));

      await expect(controller.remove(commentId)).rejects.toThrow(HttpException);
    });
  });
});


