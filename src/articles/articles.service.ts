import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { v2 as cloudinary } from 'cloudinary';
import { Tag } from '../tag/entities/tag.entity';
import { IUserActive } from 'src/common/inteface/user-active.interface';
@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRpository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}
  // Manejo de la carga de imagenes a Cloudinary.
  async handleUpload(
    image: Express.Multer.File,
    createArticleDto: CreateArticleDto,
    user: any,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          if (result && result.url) {
            console.log('image uploaded succesfully. URL: ', result.url);
            this.create(createArticleDto, user, result.url)
              .then(() => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            console.log('image upload failed. Error: ', error);
            reject(new Error('Upload failed'));
          }
        },
      );
      uploadStream.on('finish', () => {
        /**/
      });
      uploadStream.end(image.buffer);
    });
  }

  // Registro de Articulos
  async create(createArticleDto: CreateArticleDto, user: any, imageUrl: string,
  ) {
    const article = await this.articleRpository.findOne({
      where: {
        title: createArticleDto.title,
      },
    });
    if (article) throw new BadRequestException('Title already exists');

    const newArticle = new Article();
    (newArticle.title = createArticleDto.title),
      (newArticle.tag = await this.tagRepository.findOne({
        where: { tagId: createArticleDto.tagId },
      }));
    newArticle.article = JSON.stringify(createArticleDto.article);
    newArticle.image = imageUrl;
    newArticle.user = user.userId;

    try {
      await this.articleRpository.save(newArticle);
    } catch (error) {
      console.log(error);
      throw new Error('Arcticle creation failed');
    }
  }
 // Listado de articulos
  async findAll(): Promise<Article[]> {
    const articles = await this.articleRpository.find({
      relations: ['user', 'tag'],
    });
    try {
      if (!articles) {
        throw new BadRequestException('Articles not found');
      }
      articles.forEach((article) => {
        article.article = JSON.parse(article.article);
      });
      return articles;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  // Listado de articulos por ususrio
  async findAllUserArticles(user: IUserActive): Promise<Article[]> {
    const articles = await this.articleRpository.find({
      where: {
        user: { userId: user.userId },
      },
      relations: ['user', 'tag'],
    });
    try {
      if (!articles) throw new BadRequestException('Articles not found');
      articles.forEach((article) => {
        article.article = JSON.parse(article.article);
      });
      return articles;
    } catch (error) {
      throw new BadRequestException('Articles not found');
    }
  }
  // Busqueda de articulos por su Id
  async findOne(id: string): Promise<Article> {
    const article = await this.articleRpository.findOne({
      where: {
        articleId: id,
      },
      relations: ['user', 'tag'],
    });
    try {
      if (!article) throw new BadRequestException('Article not found');
      article.article = JSON.parse(article.article);
      return article;
    } catch (error) {
      throw new BadRequestException('Article does not exist');
    }
  }
    //TODO: testear el update
    // Modificacion de articulos
    async update(id: string, user: IUserActive, updateArticleDto: UpdateArticleDto):  Promise<Article> {
    const article = await this.articleRpository.findOne({
      where: {
        articleId: id,
        user: { userId: user.userId },
      },
    });
    if (!article) throw new BadRequestException('Article does not exist');
    article.title = updateArticleDto.title;
    article.article = JSON.stringify(updateArticleDto.article);
    article.tag = await this.tagRepository.findOne({
      where: { tagId: updateArticleDto.tagId },
    });
    try {
      return await this.articleRpository.save(article);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  // Borra el articulo de la base de datos
  async remove(id: string): Promise<void> {
    const article = await this.articleRpository.findOne({
      where: {
        articleId: id,
      },
    });
    try {
      if (!article) throw new BadRequestException('Article not found');
      await this.articleRpository.delete(id);
    } catch (error) {
      throw new BadRequestException('Article does not exist');
    }
  }
}
