import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Response } from 'express';
describe('ArticleController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService],
    }).compile();
    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });
  it('deberia eliminar un articulo existente', async () => {
    const articleId = '1';
    const deletedArticle: CreateArticleDto = {
      title: 'Articulo Eliminado',
      article: 'Contenido eliminado',
      image: 'imagen-eliminada.jpg',
      tagId: 1,
      userId: '1'
    };
    // Aquí deberías agregar la lógica para eliminar el artículo
    // y las expectativas de la prueba.
  });
  it('deberia manejar el error al intentar eliminar un articulo', async () => {
    const articleId = 'invalid_id';
    jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error al eliminar el articulo'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.remove(articleId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar el articulo' });
    } catch (error) {
      expect(error.message).toBe('Error al eliminar el articulo');
    }
  });
});
