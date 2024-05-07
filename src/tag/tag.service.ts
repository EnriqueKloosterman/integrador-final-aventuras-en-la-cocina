import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ){}
  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where:{
        tag: createTagDto.tag
      }
    });
    if(tag){
      throw new Error('Tag already exists');
    }
    try {
      const newTag = this.tagRepository.create(createTagDto);
      newTag.tag = createTagDto.tag;
      return await this.tagRepository.save(newTag);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllTags(): Promise<Tag[]> {
    const tags = await this.tagRepository.find();
    try {
      if(!tags){
        throw new Error('Tags not found');
      }
      return tags
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOneTag(id: number) {
    const tag = await this.tagRepository.findOne({
      where: {
        tagId: id,
      },
    });
    try {
      if (!tag) throw new Error('Tag not found');
      return tag;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOne({
        where: {
          tagId: id
        }
      })
      if(!tag) throw new BadRequestException('Tag not found');
      tag.tag = updateTagDto.tag;
      return await this.tagRepository.save(tag);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<void> {
    const tag = await this.tagRepository.findOne({
      where: {
        tagId: id
      }
    })
    try {
      if(!tag) throw new BadRequestException('Tag not found');
      await this.tagRepository.remove(tag);
    } catch (error) {
      throw new BadRequestException('Tag not found')
    }
  }
}
