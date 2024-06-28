import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { IUserActive } from '../common/interface/user-active.interface';
import { HttpException } from '@nestjs/common';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            handleUpload: jest.fn(),
            findAll: jest.fn(),
            findAllUserArticles: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
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
    it('should upload a file and create an article', async () => {
      const file = { buffer: Buffer.from('file buffer') } as Express.Multer.File;
      const createArticleDto: CreateArticleDto = {
        title: 'Test Article',
        article: 'This is a test article',
        image: 'test-image-url',
        tagId: 1,
        userId: '1',
      };

      const user: IUserActive = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        userEmail: 'test@example.com', // Ensure userEmail matches the DTO
        userPassword: 'password123', // Add a sample userPassword
        image: 'test-image-url', // Add a sample image URL
      };

      const response = {
        url: 'test-url',
        message: 'Upload successful',
        name: 'Test File',
        http_code: 200,
      };

      jest.spyOn(service, 'handleUpload').mockResolvedValue(response);

      const result = await controller.uploadFile(file, createArticleDto, user);

      expect(result).toEqual('test-url');
      expect(service.handleUpload).toHaveBeenCalledWith(file, createArticleDto, user);
    });

    it('should handle errors during file upload', async () => {
      const file = { buffer: Buffer.from('file buffer') } as Express.Multer.File;
      const createArticleDto: CreateArticleDto = {
        title: 'Test Article',
        article: 'This is a test article',
        image: 'test-image-url',
        tagId: 1,
        userId: '1',
      };

      const user: IUserActive = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        userEmail: 'test@example.com', // Ensure userEmail matches the DTO
        userPassword: 'password123', // Add a sample userPassword
        image: 'test-image-url', // Add a sample image URL
      };

      jest.spyOn(service, 'handleUpload').mockRejectedValue(new Error('Upload failed'));

      await expect(controller.uploadFile(file, createArticleDto, user)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const articles: Article[] = [
        { articleId: '1', title: 'Test Article', article: 'This is a test article', image: 'test-image-url', tag: null, user: [], comment: null, createdAt: new Date(), updatedAt: new Date() },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(articles);

      const result = await controller.findAll();

      expect(result).toEqual(articles);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle errors when fetching all articles', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Error fetching articles'));

      await expect(controller.findAll()).rejects.toThrow(HttpException);
    });
  });

  describe('getArticlesByUser', () => {
    it('should return an array of user articles', async () => {
      const user: IUserActive = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        userEmail: 'test@example.com', // Ensure userEmail matches the DTO
        userPassword: 'password123', // Add a sample userPassword
        image: 'test-image-url', // Add a sample image URL
      };

      const articles: Article[] = [
        { articleId: '1', title: 'Test Article', article: 'This is a test article', image: 'test-image-url', tag: null, user: [], comment: null, createdAt: new Date(), updatedAt: new Date() },
      ];

      jest.spyOn(service, 'findAllUserArticles').mockResolvedValue(articles);

      const result = await controller.getArticlesByUser(user);

      expect(result).toEqual(articles);
      expect(service.findAllUserArticles).toHaveBeenCalledWith(user);
    });

    it('should handle errors when fetching user articles', async () => {
      const user: IUserActive = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        userEmail: 'test@example.com', // Ensure userEmail matches the DTO
        userPassword: 'password123', // Add a sample userPassword
        image: 'test-image-url', // Add a sample image URL
      };

      jest.spyOn(service, 'findAllUserArticles').mockRejectedValue(new Error('Error fetching user articles'));

      await expect(controller.getArticlesByUser(user)).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a single article', async () => {
      const articleId = '1';
      const article: Article = { articleId: '1', title: 'Test Article', article: 'This is a test article', image: 'test-image-url', tag: null, user: [], comment: null, createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'findOne').mockResolvedValue(article);

      const result = await controller.findOne(articleId);

      expect(result).toEqual(article);
      expect(service.findOne).toHaveBeenCalledWith(articleId);
    });

    it('should handle errors when fetching an article by id', async () => {
      const articleId = '1';
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Article not found'));

      await expect(controller.findOne(articleId)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const articleId = '1';
      const updateArticleDto: UpdateArticleDto = { title: 'Updated Article', article: 'Updated content', tagId: 1 };

      const user: IUserActive = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        userEmail: 'test@example.com', // Ensure userEmail matches the DTO
        userPassword: 'password123', // Add a sample userPassword
        image: 'test-image-url', // Add a sample image URL
      };

      const updatedArticle: Article = { articleId: '1', title: 'Updated Article', article: 'Updated content', image: 'test-image-url', tag: null, user: [], comment: null, createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'update').mockResolvedValue(updatedArticle);

      const result = await controller.update(articleId, updateArticleDto, user);

      expect(result).toEqual(updatedArticle);
      expect(service.update).toHaveBeenCalledWith(articleId, user, updateArticleDto);
    });

    it('should handle errors when updating an article', async () => {
      const articleId = '1';
      const updateArticleDto: UpdateArticleDto = { title: 'Updated Article', article: 'Updated content', tagId: 1 };

      const user: IUserActive = {
        userId: '1',
        userName: 'Test User',
        userLastName: 'Last Name',
        userEmail: 'test@example.com', // Ensure userEmail matches the DTO
        userPassword: 'password123', // Add a sample userPassword
        image: 'test-image-url', // Add a sample image URL
      };

      jest.spyOn(service, 'update').mockRejectedValue(new Error('Error updating article'));

      await expect(controller.update(articleId, updateArticleDto, user)).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should remove an article', async () => {
      const articleId = '1';

      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove(articleId);

      expect(service.remove).toHaveBeenCalledWith(articleId);
    });

    it('should handle errors when removing an article', async () => {
      const articleId = '1';

      jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error removing article'));

      await expect(controller.remove(articleId)).rejects.toThrow(HttpException);
    });
  });
});
