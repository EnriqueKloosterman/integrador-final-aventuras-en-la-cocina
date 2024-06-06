import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag, Article])
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
