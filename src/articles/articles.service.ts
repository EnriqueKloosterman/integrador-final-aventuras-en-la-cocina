import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { v2 as cloudinary } from 'cloudinary'; 
import { Tag } from 'src/tag/entities/tag.entity';
@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRpository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ){}
  // Manejo de la carga de imagenes a Cloudinary.
  async handleUpload(image: Express.Multer.File, createArticleDto: CreateArticleDto): Promise<CloudinaryResponse>{
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if(error) return reject(error)
          if (result && result.url){
            console.log('image uploaded succesfully. URL: ', result.url);
            this.create(createArticleDto, result.url)
            .then(() => {
              resolve(result)
            })
            .catch((error) => {
              reject(error)
            }) 
          } else {
            console.log('image upload failed. Error: ', error);
            reject(new Error('Upload failed'));            
          }
        }
      )
      uploadStream.on('finish', () => { /**/ });
      uploadStream.end(image.buffer);
    })
  }


  // Registro de Articulos
  async create(createArticleDto: CreateArticleDto, imageUrl:string) {
    const article = await this.articleRpository.findOne({
      where:{
        title:createArticleDto.title
      }
    })
    if(article) throw new BadRequestException('Title already exists')

    const newArticle = new Article()
    newArticle.title = createArticleDto.title,
    newArticle.tag = await this.tagRepository.findOne({where:{ tagId: createArticleDto.tagId }});
    newArticle.article = JSON.stringify(createArticleDto.article)
    newArticle.image = imageUrl    

    try {
      await this.articleRpository.save(newArticle)
    } catch (error) {
      console.log(error)
      throw new Error('Arcticle creation failed')
    }
  }


  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
