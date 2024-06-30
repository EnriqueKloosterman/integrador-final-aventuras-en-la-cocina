import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { IUserActive } from '../common/inteface/user-active.interface';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  const mockArticle: Article = {
    articleId: '1',
    title: 'Test Article',
    article: JSON.stringify({ content: 'This is a test article' }),
    image: 'http://example.com/image.jpg',
    tag: { tagId: '1', tagName: 'Test' },
    user: { userId: '1', username: 'user1' },
  };

  const mockUser: IUserActive = {
    userId: '1',
    username: 'user1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            handleUpload: jest.fn().mockResolvedValue({ url: 'http://example.com/image.jpg' }),
            findAll: jest.fn().mockResolvedValue([mockArticle]),
            findOne: jest.fn().mockResolvedValue(mockArticle),
            findAllUserArticles: jest.fn().mockResolvedValue([mockArticle]),
            create: jest.fn().mockResolvedValue(mockArticle),
            update: jest.fn().mockResolvedValue(mockArticle),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload an article with an image', async () => {
      const createArticleDto: CreateArticleDto = { title: 'Test', article: {}, tagId: '1' };
      const image = { buffer: Buffer.from('test') } as Express.Multer.File;

      const result = await controller.uploadFile(image, createArticleDto, mockUser);
      expect(service.handleUpload).toHaveBeenCalledWith(image, createArticleDto, mockUser);
      expect(result).toEqual('http://example.com/image.jpg');
    });

    it('should throw an exception if image or data is missing', async () => {
      await expect(controller.uploadFile(null, null, mockUser)).rejects.toThrow(
        new HttpException('Image and data required', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockArticle]);
    });
  });

  describe('getArticlesByUser', () => {
    it('should return articles for a specific user', async () => {
      const result = await controller.getArticlesByUser(mockUser);
      expect(service.findAllUserArticles).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual([mockArticle]);
    });
  });

  describe('findOne', () => {
    it('should return a single article', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockArticle);
    });

    it('should throw an exception if article not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new HttpException('Article not found', HttpStatus.NOT_FOUND));

      await expect(controller.findOne('2')).rejects.toThrow(
        new HttpException('Article not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const updateArticleDto: UpdateArticleDto = { title: 'Updated Title', article: {}, tagId: '1' };

      const result = await controller.update('1', updateArticleDto, mockUser);
      expect(service.update).toHaveBeenCalledWith('1', mockUser, updateArticleDto);
      expect(result).toEqual(mockArticle);
    });
  });

  describe('remove', () => {
    it('should remove an article', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw an exception if article not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

      await expect(controller.remove('2')).rejects.toThrow(
        new HttpException('Article not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
