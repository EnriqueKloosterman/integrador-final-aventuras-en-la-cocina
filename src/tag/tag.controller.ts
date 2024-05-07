import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('register/tag')
  @UsePipes(new ValidationPipe({ transform: true}))
  async create(@Body() createTagDto: CreateTagDto): Promise<CreateTagDto> {
    try {
      return await this.tagService.create(createTagDto);
    } catch (error) {
      throw new HttpException('Error creating tag', HttpStatus.BAD_REQUEST)
    }
  }

  @Get(`tags`)
  @UsePipes(new ValidationPipe({ transform: true}))
  async findAll(): Promise<CreateTagDto[]> {
    try {
      const tags = await this.tagService.findAllTags();
      if(tags.length){
        return tags;
      }
    } catch (error) {
      throw new HttpException('Error finding tags', HttpStatus.BAD_REQUEST)
    }
  }

  @Get('tag/:id')
  @UsePipes(new ValidationPipe({ transform: true}))
  async findOne(@Param('id') id: string): Promise<CreateTagDto> {
    try {
      const tag = await this.tagService.findOneTag(+id);
      if(!tag) throw new HttpException('Tag not found', HttpStatus.BAD_REQUEST);
      return tag;
    } catch (error) {
      throw new HttpException('Error finding tag', HttpStatus.BAD_REQUEST)
    }
  }

  @Patch('update/tag/:id')
  @UsePipes(new ValidationPipe({ transform: true}))
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto): Promise<UpdateTagDto> {
    try {
      const tag = await this.tagService.update(+id, updateTagDto);
      if(!tag) throw new HttpException('Tag not found', HttpStatus.BAD_REQUEST);
      return this.tagService.update(+id, updateTagDto);
    } catch (error) {
      throw new HttpException('Error updating tag', HttpStatus.BAD_REQUEST)
    }
  }

  @Delete('remove/tag/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true}))
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const tag = await this.tagService.findOneTag(+id)
      if(tag) await this.tagService.remove(+id)
    } catch (error) {
      throw new HttpException('Error removing tag', HttpStatus.BAD_REQUEST)
    }
  }
}
