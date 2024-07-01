import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { IUserActive } from '../common/interface/user-active.interface'; // Ruta ajustada

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  const mockComment: Comment = {
    commentId: 1,
    comment: 'This is a test comment',
    user: { userId: '1', userName: 'John', userLastName: 'Doe', image: 'image.jpg' },
    article: { 
      articleId: '1', 
      title: 'Test Article', 
      article: '', 
      image: '', 
      tag: { tagId: '', tagName: '' }, 
      user: { userId: '', username: '' } 
    },
    recipe: null,
  };

  const mockUser: IUserActive = {
    userId: '1',
    username: 'user1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockComment),
            findAllCommentsByArticle: jest.fn().mockResolvedValue([mockComment]),
            findAllCommentsByRecipe: jest.fn().mockResolvedValue([mockComment]),
            findOne: jest.fn().mockResolvedValue(mockComment),
            update: jest.fn().mockResolvedValue(mockComment),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createComentForArticle', () => {
    it('should create a comment for an article', async () => {
      const createCommentDto: CreateCommentDto = { comment: 'Great article!' };
      const articleId = '1';

      const result = await controller.createComentForArticle(articleId, createCommentDto, mockUser);
      expect(service.create).toHaveBeenCalledWith(createCommentDto, mockUser, articleId);
      expect(result).toEqual(mockComment);
    });

    it('should throw an exception if data is missing', async () => {
      await expect(controller.createComentForArticle('1', null, null)).rejects.toThrow(
        new HttpException('User and comment data required', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('createComentForRecipe', () => {
    it('should create a comment for a recipe', async () => {
      const createCommentDto: CreateCommentDto = { comment: 'Delicious!' };
      const recipeId = '1';

      const result = await controller.createComentForRecipe(recipeId, createCommentDto, mockUser);
      expect(service.create).toHaveBeenCalledWith(createCommentDto, mockUser, undefined, recipeId);
      expect(result).toEqual(mockComment);
    });
  });

  describe('findAllCommentsByArtcicle', () => {
    it('should return comments for a specific article', async () => {
      const result = await controller.findAllCommentsByArtcicle('1');
      expect(service.findAllCommentsByArticle).toHaveBeenCalledWith('1');
      expect(result).toEqual([mockComment]);
    });
  });

  describe('findAllCommentsByRecipe', () => {
    it('should return comments for a specific recipe', async () => {
      const result = await controller.findAllCommentsByRecipe('1');
      expect(service.findAllCommentsByRecipe).toHaveBeenCalledWith('1');
      expect(result).toEqual([mockComment]);
    });
  });

  describe('findOne', () => {
    it('should return a single comment', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockComment);
    });
  });

  describe('update', () => {
    it('should update a comment', async () => {
      const updateCommentDto: UpdateCommentDto = { comment: 'Updated comment' };

      const result = await controller.update('1', updateCommentDto);
      expect(service.update).toHaveBeenCalledWith(1, updateCommentDto);
      expect(result).toEqual(mockComment);
    });
  });

  describe('remove', () => {
    it('should remove a comment', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw an exception if comment not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

      await expect(controller.remove('2')).rejects.toThrow(
        new HttpException('Comment not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
