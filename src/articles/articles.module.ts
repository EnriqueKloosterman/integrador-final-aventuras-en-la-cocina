import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User, Tag])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
